"use strict";
var ConfigRecord = (function () {
    function ConfigRecord(key, value) {
        this.key = key;
        this.value = value;
    }
    ConfigRecord.prototype.toString = function () {
        return '{ key: ' + this.key + ', value: ' + this.value + ' }';
    };
    return ConfigRecord;
}());
exports.ConfigRecord = ConfigRecord;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLXJlY29yZC5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbmZpZy1yZWNvcmQubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBO0lBRUUsc0JBQW1CLEdBQVcsRUFBUyxLQUFhO1FBQWpDLFFBQUcsR0FBSCxHQUFHLENBQVE7UUFBUyxVQUFLLEdBQUwsS0FBSyxDQUFRO0lBQUcsQ0FBQztJQUV4RCwrQkFBUSxHQUFSO1FBQ0UsTUFBTSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUNoRSxDQUFDO0lBRUgsbUJBQUM7QUFBRCxDQUFDLEFBUkQsSUFRQztBQVJZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9kZWxJbnRlcmZhY2UgfSBmcm9tICcuLi8uLi8uLi9tb2RlbC5pbnRlcmZhY2UnO1xuXG5leHBvcnQgY2xhc3MgQ29uZmlnUmVjb3JkIGltcGxlbWVudHMgTW9kZWxJbnRlcmZhY2Uge1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBrZXk6IHN0cmluZywgcHVibGljIHZhbHVlOiBzdHJpbmcpIHt9XG5cbiAgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gJ3sga2V5OiAnICsgdGhpcy5rZXkgKyAnLCB2YWx1ZTogJyArIHRoaXMudmFsdWUgKyAnIH0nO1xuICB9XG5cbn1cbiJdfQ==