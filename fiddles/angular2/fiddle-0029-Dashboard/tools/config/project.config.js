var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var path_1 = require('path');
var seed_config_1 = require('./seed.config');
var ProjectConfig = (function (_super) {
    __extends(ProjectConfig, _super);
    function ProjectConfig() {
        _super.apply(this, arguments);
        this.PROJECT_TASKS_DIR = path_1.join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');
        this.FONTS_DEST = this.APP_DEST + "/fonts";
        this.FONTS_SRC = [
            'node_modules/font-awesome/fonts/**',
            'node_modules/mdi/fonts/**'
        ];
    }
    return ProjectConfig;
})(seed_config_1.SeedConfig);
exports.ProjectConfig = ProjectConfig;
//# sourceMappingURL=project.config.js.map