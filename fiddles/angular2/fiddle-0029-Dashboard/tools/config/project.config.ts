import {join} from 'path';
import {SeedConfig} from './seed.config';

export class ProjectConfig extends SeedConfig {
  PROJECT_TASKS_DIR    = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');

  FONTS_DEST = `${this.APP_DEST}/fonts`;
  FONTS_SRC = [
    'node_modules/font-awesome/fonts/**',
    'node_modules/mdi/fonts/**'
  ];
}
