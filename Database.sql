CREATE DATABASE `credits_db` ;

CREATE TABLE credits_tb (

    ID INT unsigned NOT NULL AUTO_INCREMENT,
    Fname VARCHAR(255) NOT NULL,
    Credits INT(11) NOT NULL,
    PRIMARY KEY (ID)


);

-- http://www.neilwallis.com/projects/php/subtotals.php?group1=3&group2=1&group3=4