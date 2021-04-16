import os
import logging
import time
import speech_recognition as speech_toolbox

from pydub import AudioSegment
from pydub.silence import split_on_silence

tmp_dir = 'chunks'
formats_to_delete = ['.wav']
transcript_file = 'transcript.txt'

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def cleanup():
    if os.path.isdir(tmp_dir):
        os.system('rm -rf ' + tmp_dir)
    for (dirpath, dirnames, filenames) in os.walk('.'):
        for filename in filenames:
            if filename.endswith(tuple(formats_to_delete)):
                filepath = dirpath + '/' + filename
                os.system('rm -rf ' + filepath)


def setup():
    if os.path.isfile(transcript_file):
        os.system('rm -rf ' + transcript_file)
    if os.path.isdir(tmp_dir):
        cleanup()
    os.mkdir(tmp_dir)
    logger.debug( ' Created ' + tmp_dir +' directory ')


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
                    logger.debug(' Created ' + str(wav_filename))
                except Exception as error:
                    logger.exception(error)


def explodeWav():
    formats_to_convert = ['.wav']
    for (dirpath, dirnames, filenames) in os.walk('.'):
        for filename in filenames:
            if filename.endswith(tuple(formats_to_convert)):
                try:
                    file_path = dirpath + '/' + filename
                    sound_file = AudioSegment.from_wav(file_path)
                    audio_chunks = split_on_silence(sound_file, min_silence_len=2000, silence_thresh=-70)
                    logger.debug('audio chunk count ' + str(len(audio_chunks)))
                    if len(audio_chunks) > 1:
                      for i in range(0, len(audio_chunks)):
                          time_stamp = time.time()
                          chunk_file =  os.path.join(tmp_dir, str(i+1).zfill(4)+ '_' +  str(int(time_stamp)) + '.wav')
                          audio_chunks[i].export(chunk_file, format='wav')
                          time.sleep(1)
                except Exception as error:
                    logger.exception(error)


def toTxt():
    recognizer = speech_toolbox.Recognizer()
    formats_to_convert = ['.wav']
    for (dirpath, dirnames, filenames) in os.walk('./' + tmp_dir):
        filenames.sort()
        for filename in filenames:
            if filename.endswith(tuple(formats_to_convert)):
                try:
                    filepath = dirpath + '/' + filename
                    (path, file_extension) = os.path.splitext(filepath)
                    file_extension_final = file_extension.replace('.', '')
                    with speech_toolbox.AudioFile(filepath) as audio_file:
                        audio_recording = recognizer.record(audio_file)
                        text = recognizer.recognize_google(audio_recording)
                        txt_filename = filename.replace(file_extension_final, 'txt')
                        txt_file_path = dirpath + '/' + txt_filename
                        with open(txt_file_path, 'w') as txt_file:
                            print(text, file=txt_file)
                        logger.debug(' Created ' + txt_file_path)
                        os.system('cat ' + txt_file_path + ' >> ' + transcript_file)
                except speech_toolbox.UnknownValueError:
                    logger.info(' Google Speech Recognition could not understand audio')
                except speech_toolbox.RequestError as request_error:
                    logger.info(' Could not request results from Google Speech Recognition service; {0}'.format(request_error))
                except Exception as unknown_error:
                    logger.exception(unknown_error)
    if os.path.isfile(transcript_file):
        os.system('cat ' + transcript_file)


def main():
    setup()
    toWav()
    explodeWav()
    toTxt()
    cleanup()


main()
os._exit(1)
