import os
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

from pydub import AudioSegment

def toWav():
    formats_to_convert = ['.m4a']
    for (dirpath, dirnames, filenames) in os.walk('.'):
        for filename in filenames:
            if filename.endswith(tuple(formats_to_convert)):
                filepath = dirpath + '/' + filename
                (path, file_extension) = os.path.splitext(filepath)
                file_extension_final = file_extension.replace('.', '')
                try:
                    track = AudioSegment.from_file(filepath,
                            file_extension_final)
                    wav_filename = filename.replace(file_extension_final, 'wav')
                    wav_path = dirpath + '/' + wav_filename
                    file_handle = track.export(wav_path, format='wav')
                    logger.info('Created: ' + str(wav_filename))
                except Exception as error:
                    logger.exception(error)


from pydub.silence import split_on_silence

def explodeWav():
    # split into seperate wav files based on pauses and silence level
    # delete the original wav file
    formats_to_convert = ['.wav']
    for (dirpath, dirnames, filenames) in os.walk('.'):
        for filename in filenames:
            if filename.endswith(tuple(formats_to_convert)):
                file_path = dirpath + '/' + filename
                logger.info('Exploding ' + file_path + ' ...')
                try:
                    sound_file = AudioSegment.from_wav(file_path)
                    audio_chunks = split_on_silence(sound_file,
                        min_silence_len=100,
                        silence_thresh=-16
                    )
                    for i, chunk in enumerate(audio_chunks):
                        chunk_file = 'chunk{0}.wav'.format(i)
                        logger.info('Created: ' + str(chunk_file))
                        chunk.export(chunk_file, format="wav")
                    os.remove(file_path)
                except Exception as error:
                    logger.exception(error)


import speech_recognition as sr

def toTxt():
    recognize = sr.Recognizer()
    formats_to_convert = ['.wav']
    for (dirpath, dirnames, filenames) in os.walk('.'):
        for filename in filenames:
            if filename.endswith(tuple(formats_to_convert)):
                filepath = dirpath + '/' + filename
                (path, file_extension) = os.path.splitext(filepath)
                file_extension_final = file_extension.replace('.', '')

                try:
                  with sr.AudioFile(filepath) as source:
                      audio_data = recognize.record(source)
                      text = recognize.recognize_google(audio_data)
                      txt_filename = filename.replace(file_extension_final, 'txt')
                      txt_path = dirpath + '/' + txt_filename
                      with open(txt_path, 'w') as txt_file:
                        print(text, file=txt_file)
                      logger.info('Created ' + txt_path)

                except Exception as error:
                    logger.exception(error)

def main():
    toWav()
    explodeWav()
    toTxt()

main()
os._exit(1)
