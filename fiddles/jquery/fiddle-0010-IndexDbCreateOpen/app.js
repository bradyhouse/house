window.writeError = function (error) {
    var div = document.createElement("div");
    $(div).text(error);
    $("#error").append(div);
}
window.writeLog = function (log) {
    var div = document.createElement("div");
    $(div).text(log);
    $("#info").append(div);
}


var studentData = [
    {name: "Elvis"},
    {name: "George"},
    {name: "Carla", age: 24},
    {name: "Jason", email: "jlamber4@iit.edu"}
];

var courseData = [
    {
        courseid: "465",
        name: "Rich Internet Applications",
        credits: "3",
        faculty: 1,
        students: ["Jason", "Carla", "Elvis", "George"],
    },
    {
        courseid: "462",
        name: "Intro to Internet Applications",
        credits: "3",
        faculty: 2,
        announcement: "Get ready for next semester",
    }
];

var db; //database will be stored in this variable
/**
 * 1. First we must connect to the database
 * We can have many databases each with a unique name
 */
var openDbRequest = window.indexedDB.open("CourseDatabase", 4);
//2. The first time a new database version is requested - this is called
openDbRequest.onupgradeneeded = function (event) {
    writeLog("HISTORY: database about to update");


    // 1a. we have a temporary connection we can use to upgrade
    var tempDb = event.target.result;

    // 1b. in this case we are removing the courses datastore
    // if it already existed (this will erase all data)
    if (tempDb.objectStoreNames.contains("courses")) {
        tempDb.deleteObjectStore("courses");
    }
    var courseObjectStore = tempDb.createObjectStore("courses", {
        keyPath: "courseid"
    });
    if (tempDb.objectStoreNames.contains("students")) {
        tempDb.deleteObjectStore("students");
    }
    var studentObjectStore = tempDb.createObjectStore("students", {
        keyPath: "name"
    });

    // 1c. Create Indices to search for things other than keys
    // Create an index to search courses by credit hours
    // These are not unique to a course, so we cannot use unique
    courseObjectStore.createIndex("credits", "credits", {
        unique: false
    });
    // Create an index to search courses by name
    // Names are unique so use a unique index.
    courseObjectStore.createIndex("name", "name", {
        unique: true
    });

    writeLog("HISTORY: database updated");

};
//3. After any upgrades are performed - the data is ready for queries
//we assign the 'result' to the db object to be used later
openDbRequest.onsuccess = function (event) {
    db = this.result;
    writeLog("HISTORY: database connection established");
    addData();
    writeLog("HISTORY: database data added");
};
//4. If there was db-related (but not general javascript) error
openDbRequest.onerror = function (event) {
    writeError(request.errorCode)
};

//5. We can add data either in onupgradeneeded or afterwards
function addData() {

    if (!db) //cant without it!
        return;

    var courseObjectStore = db.transaction("courses", "readwrite").objectStore("courses");
    for (var i in courseData) {
        courseObjectStore.add(courseData[i]);
    }

    var studentObjectStore = db.transaction("students", "readwrite").objectStore("students");
    for (var i in studentData) {
        studentObjectStore.add(studentData[i]);
    }


}


//6. After a db is setup, we can query it
window.queryDatabase = function () {

    if (!db) //cant query without it!
        return;

    //6a. Basic GET request - we can query an object store by the key
    db.transaction("students").objectStore("students").get("Jason").onsuccess = function (event) {
        //student object is remade from database
        var theStudentObject = event.target.result;
        writeLog("QUERY: Student data" + JSON.stringify(theStudentObject));
    };

    //6b. We can use our indicies to search fields we want
    db.transaction("courses").objectStore("courses").index("name").get("Rich Internet Applications").onsuccess = function (event) {
        //student object is remade from database
        var theCourseObject = event.target.result;
        writeLog("QUERY: Course data" + JSON.stringify(theCourseObject));
    };

    //6c. A Cursor request, this lets us iterate over data in the
    db.transaction("courses").objectStore("courses").openCursor().onsuccess = function (event) {
        var cursor = event.target.result;
        if (cursor) {
            writeLog("CURSOR: Course: " + cursor.key + " has name " + cursor.value.name);
            cursor.
                continue();
        } else {
            writeLog("CURSOR: No more entries!");
        }
    };

}
