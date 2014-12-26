/*
 * Brady Houseknecht (20262734) ITM 462 ~ Assignment #3
 */

/* --------------------------------------------------------------
 * DROP / CREATE DATABASE
 * ------------------------------------------------------------ */

	DROP DATABASE IF EXISTS `house_brady_20262734_assignment3`;

	CREATE DATABASE `house_brady_20262734_assignment3` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

/* --------------------------------------------------------------
 * CREATE TABLES
 * ------------------------------------------------------------ */

	CREATE TABLE `house_brady_20262734_assignment3`.`stu_specialization` (
  		`SpecializationId` INT NOT NULL AUTO_INCREMENT COMMENT 'Auto-incrementing record id (aka primary key).',
  		`Title` VARCHAR(255) NOT NULL COMMENT 'Specialization title value.  This value is required and should be unique.',
  		`Description` VARCHAR(1024) NOT NULL COMMENT 'One to two sentences describing specialization.  This value is required.',
  	PRIMARY KEY (`SpecializationId`),
  	UNIQUE INDEX `Title_UNIQUE` (`Title` ASC));

	CREATE TABLE `house_brady_20262734_assignment3`.`stu_user` (
  		`UserId` INT NOT NULL AUTO_INCREMENT,
  		`Name` VARCHAR(255) NOT NULL COMMENT 'The user’s name. This value will be used to identify (or communicate) with the user within the application or via email.',
  		`Login` VARCHAR(32) NOT NULL COMMENT 'User’s login ',
  		`Password` VARCHAR(32) NOT NULL COMMENT 'Field used to store MD5 Hash.',
  		`Locked` BIT NOT NULL DEFAULT 0 COMMENT 'Field used to lock users out after 3 failed login attempts.',
  		`Email` VARCHAR(255) NOT NULL COMMENT 'User’s email address.  This field is required in case the user’s password must be reset or the user’s account enters a locked state.',
  	PRIMARY KEY (`UserId`),
  	UNIQUE INDEX `Name_UNIQUE` (`Name` ASC),
  	UNIQUE INDEX `Login_UNIQUE` (`Login` ASC));

	CREATE TABLE `house_brady_20262734_assignment3`.`stu_course` (
	  `CourseId` INT NOT NULL AUTO_INCREMENT,
	  `CourseNumber` VARCHAR(32) NOT NULL,
	  `Title` VARCHAR(256) NOT NULL,
	  `Credits` FLOAT NOT NULL,
	  `Cost` FLOAT NOT NULL,
	  `SpecializationId` INT NOT NULL,
	  PRIMARY KEY (`CourseId`),
	  UNIQUE INDEX `CourseNumber_UNIQUE` (`CourseNumber` ASC)) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

	CREATE TABLE `house_brady_20262734_assignment3`.`stu_user_course_link` (
	  `UserCourseLinkId` INT NOT NULL AUTO_INCREMENT,
	  `UserId` INT NOT NULL,
	  `CourseId` INT NOT NULL,
	  PRIMARY KEY (`UserCourseLinkId`)) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

	CREATE TABLE `house_brady_20262734_assignment3`.`stu_site` (
	  `SiteId` INT NOT NULL AUTO_INCREMENT,
	  `Title` VARCHAR(256) NOT NULL,
	  `SubTitle` VARCHAR(1024) NOT NULL,
	  `Salt` VARCHAR(10) NOT NULL,
	  PRIMARY KEY (`SiteId`)) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

	CREATE TABLE `house_brady_20262734_assignment3`.`stu_component` (
	  `ComponentId` INT NOT NULL AUTO_INCREMENT,
	  `ComponentName` VARCHAR(32) NOT NULL,
	  `ComponentPath` VARCHAR(1024) NOT NULL,
	  `SiteId` INT NULL,
	  `Enabled` BIT NOT NULL DEFAULT 0,
	  PRIMARY KEY (`ComponentId`),
	  UNIQUE INDEX `ComponentName_UNIQUE` (`ComponentName` ASC)) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

/* --------------------------------------------------------------
 * CREATE FOREIGN KEYS
 * ------------------------------------------------------------ */

	ALTER TABLE `house_brady_20262734_assignment3`.`stu_course`
	ADD INDEX `SpecializationId_Idx` (`SpecializationId` ASC);
	ALTER TABLE `house_brady_20262734_assignment3`.`stu_course`
	ADD CONSTRAINT `SpecializationId`
	  FOREIGN KEY (`SpecializationId`)
	  REFERENCES `house_brady_20262734_assignment3`.`stu_specialization` (`specializationId`)
	  ON DELETE NO ACTION
	  ON UPDATE NO ACTION;

	ALTER TABLE `house_brady_20262734_assignment3`.`stu_user_course_link`
	ADD INDEX `UserCourseId_Idx` (`UserId` ASC),
	ADD INDEX `CourseId_Idx` (`CourseId` ASC);
	ALTER TABLE `house_brady_20262734_assignment3`.`stu_user_course_link`
	ADD CONSTRAINT `UserCourseId`
	  FOREIGN KEY (`UserId`)
	  REFERENCES `house_brady_20262734_assignment3`.`stu_user` (`UserId`)
	  ON DELETE NO ACTION
	  ON UPDATE NO ACTION,
	ADD CONSTRAINT `CourseId`
	  FOREIGN KEY (`CourseId`)
	  REFERENCES `house_brady_20262734_assignment3`.`stu_course` (`CourseId`)
	  ON DELETE NO ACTION
	  ON UPDATE NO ACTION;

	ALTER TABLE `house_brady_20262734_assignment3`.`stu_component`
	ADD INDEX `SiteId_Idx` (`SiteId` ASC);
	ALTER TABLE `house_brady_20262734_assignment3`.`stu_component`
	ADD CONSTRAINT `SiteId`
	  FOREIGN KEY (`SiteId`)
	  REFERENCES `house_brady_20262734_assignment3`.`stu_site` (`SiteId`)
	  ON DELETE NO ACTION
	  ON UPDATE NO ACTION;

/* --------------------------------------------------------------
 * CREATE STORED PROCEDURES
 * ------------------------------------------------------------ */

	DELIMITER $$
	CREATE PROCEDURE `house_brady_20262734_assignment3`.`stu_user_i`
    	 (
        	IN  p_name                      	VARCHAR(255)   ,
        	IN  p_login                    		VARCHAR(32)   ,
        	IN  p_password                      VARCHAR(32)   ,
        	IN  p_email                     	VARCHAR(255)
        )
	BEGIN

		DECLARE l_salt VARCHAR(10);

		SET l_salt = (SELECT site.Salt FROM `house_brady_20262734_assignment3`.`stu_site` site WHERE 1);

	    INSERT INTO `house_brady_20262734_assignment3`.`stu_user`
    	     (
				Name		                    ,
				Login                         	,
           		Password	 	                ,
           		Email
	         )
    	VALUES
         	(
           		p_name	                  		,
           		p_login 	                    ,
           		SHA1(CONCAT(p_password,l_salt))	,
           		p_email
         	);
	END;
	$$
	DELIMITER ;

	DELIMITER $$
	CREATE PROCEDURE `house_brady_20262734_assignment3`.`stu_user_u`
    	 (
        	IN  p_userId						INT				,
        	IN  p_name                      	VARCHAR(255)   	,
        	IN  p_login                    		VARCHAR(32)   	,
        	IN  p_password                      VARCHAR(32)   	,
        	IN  p_email                     	VARCHAR(255)   	,
        	IN  p_locked						BIT
    	 )
	BEGIN

		DECLARE l_salt VARCHAR(10);

		SET l_salt = (SELECT site.Salt FROM `house_brady_20262734_assignment3`.`stu_site` site WHERE 1);

    	UPDATE `house_brady_20262734_assignment3`.`stu_user`
    	SET
    		Name 		= p_name 				,
			Login 		= p_login				,
           	Password 	= SHA1(CONCAT(p_password,l_salt)),
           	Email      	= p_email				,
           	Locked		= p_locked
    	WHERE
    		UserId = p_userId ;

	END;
	$$
	DELIMITER ;

	DELIMITER $$
	CREATE PROCEDURE `house_brady_20262734_assignment3`.`stu_user_s` ()
	BEGIN

    	SELECT 	*
    	FROM	`house_brady_20262734_assignment3`.`stu_user`;

	END;
	$$
	DELIMITER ;

	DELIMITER $$
 	CREATE PROCEDURE `house_brady_20262734_assignment3`.`stu_specialization_i`
    	 (
        	IN  p_title                      	VARCHAR(255)    ,
        	IN  p_description                   VARCHAR(1024)
    	 )
	BEGIN

	    INSERT INTO `house_brady_20262734_assignment3`.`stu_specialization`
    	     (
				Title		                    ,
           		Description
	         )
    	VALUES
         	(
           		p_title	                  		,
           		p_description
         	);
	END;
	$$
	DELIMITER ;

 	DELIMITER $$
	CREATE PROCEDURE `house_brady_20262734_assignment3`.`stu_site_i`
    	 (
        	IN  p_title                      	VARCHAR(256)   ,
        	IN  p_subTitle                 		VARCHAR(1024)  ,
        	IN  p_salt							VARCHAR(10)
    	 )
	BEGIN

	    INSERT INTO `house_brady_20262734_assignment3`.`stu_site`
    	     (
				Title		                    ,
				SubTitle                       	,
				Salt
	         )
    	VALUES
         	(
           		p_title	                  		,
           		p_subTitle 	                    ,
           		p_salt
         	);
	END;
	$$
	DELIMITER ;

	CREATE PROCEDURE `house_brady_20262734_assignment3`.`stu_course_i`
	(IN `p_courseNumber` VARCHAR(32), IN `p_title` VARCHAR(256), IN `p_credits` FLOAT, IN `p_cost` FLOAT, IN `p_specializationId` INT)
	COMMENT 'Course Insert Procedure.'
	NOT DETERMINISTIC NO SQL SQL SECURITY DEFINER
	INSERT INTO `house_brady_20262734_assignment3`.`stu_course`
	( CourseNumber , Title , Credits , Cost , SpecializationId )
	VALUES ( p_courseNumber , p_title , p_credits , p_cost , p_specializationId );

	CREATE PROCEDURE `house_brady_20262734_assignment3`.`stu_course_summary_s`()
	COMMENT 'Lists course numbers and descriptions.'
	NOT DETERMINISTIC NO SQL SQL SECURITY DEFINER
	SELECT CourseId, CourseNumber, Title, SpecializationId FROM stu_course ORDER BY CourseNumber ASC;

	CREATE PROCEDURE `house_brady_20262734_assignment3`.`stu_course_detail_s`(IN `p_courseId` INT)
	COMMENT 'View the details of a particular course based on it''s id.'
	NOT DETERMINISTIC NO SQL SQL SECURITY DEFINER
	SELECT DISTINCT course.CourseId, course.CourseNumber, course.Title as 'CourseDescription',
	course.Credits, course.Cost, special.SpecializationId, special.Title as 'Specialization',
	special.Description as 'SpecializationDescription'
	FROM stu_course course
	INNER JOIN stu_specialization special
	ON course.SpecializationId = special.SpecializationId
	WHERE course.CourseId = p_courseId;

	CREATE PROCEDURE `house_brady_20262734_assignment3`.`stu_site_s`()
	COMMENT 'Get the contents of the stu_site table.'
	NOT DETERMINISTIC NO SQL SQL SECURITY DEFINER
	SELECT * FROM stu_site;

/* --------------------------------------------------------------
 * CREATE DATA
 * ------------------------------------------------------------ */


	CALL `house_brady_20262734_assignment3`.`stu_specialization_i`('Data Management', 'This specialization focuses on the design, development and administration of traditional and Internet-based data management');
	CALL `house_brady_20262734_assignment3`.`stu_course_i`('ITMD 422','Advanced Database Management', '3.0', '3000.0', '1');
	CALL `house_brady_20262734_assignment3`.`stu_course_i`('ITMS 428','Database Security', '3.0', '3000.0', '1');
	CALL `house_brady_20262734_assignment3`.`stu_site_i`('Stu', 'ITM 462 Assignment 3', 'word');
	CALL `house_brady_20262734_assignment3`.`stu_user_i`('brady house', 'bhouse', '33wonder', 'bradyhouse@gmail.com');
	CALL `house_brady_20262734_assignment3`.`stu_user_i`('root', 'admin', 'letmein', 'bradyhouse@gmail.com');


