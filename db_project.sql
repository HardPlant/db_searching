CREATE SEQUENCE UserID_Sequence START WITH 1 INCREMENT BY 1;
/
CREATE TABLE usr(user_id INT NOT NULL,
name VARCHAR(20),
email VARCHAR(20),
country VARCHAR(10),
PRIMARY KEY (user_id));
/
CREATE OR REPLACE TRIGGER user_increment BEFORE INSERT ON usr FOR EACH ROW
BEGIN
    SELECT UserID_Sequence.NEXTVAL
    INTO :new.user_id
    FROM dual;
END;
/
CREATE SEQUENCE Country_Sequence START WITH 1 INCREMENT BY 1;
/
CREATE TABLE Country(
country_id INT NOT NULL,
name VARCHAR(20),
PRIMARY KEY (country_id)
);
/
CREATE OR REPLACE TRIGGER country_increment
BEFORE INSERT ON Country
FOR EACH ROW
BEGIN
    SELECT Country_Sequence.NEXTVAL
    INTO :new.country_id
    FROM dual;
END;
/
CREATE SEQUENCE Request_Sequence START WITH 1 INCREMENT BY 1;
/
CREATE TABLE Request(
request_id INT NOT NULL,
time DATE,
user_id INT NOT NULL,
query VARCHAR(100),
num_results INT,
PRIMARY KEY(request_id),
FOREIGN KEY(user_id) references usr(user_id)
);
/
CREATE OR REPLACE TRIGGER request_increment
BEFORE INSERT ON Request
FOR EACH ROW
BEGIN
    SELECT Request_Sequence.NEXTVAL
    INTO :new.request_id
    FROM dual;
    SELECT CURRENT_DATE
    INTO :new.time
    FROM dual;
END;
/
CREATE SEQUENCE Click_Sequence START WITH 1 INCREMENT BY 1;
/
CREATE TABLE Click(
click_id INT NOT NULL,
time DATE,
request_id INT NOT NULL,
url VARCHAR(100),
PRIMARY KEY(click_id),
FOREIGN KEY(request_id) references Request(request_id)
);
/
CREATE OR REPLACE TRIGGER click_increment
BEFORE INSERT ON Click
FOR EACH ROW
BEGIN
    SELECT Click_Sequence.NEXTVAL
    INTO :new.click_id
    FROM dual;
    SELECT CURRENT_DATE
    INTO :new.time
    FROM dual;
END;
/
CREATE SEQUENCE Data_Sequence START WITH 1 INCREMENT BY 1;
/
CREATE TABLE Data(
data_id INT NOT NULL,
title VARCHAR(100),
text VARCHAR(200),
url VARCHAR(100)
);
/
CREATE OR REPLACE TRIGGER data_increment
BEFORE INSERT ON Data
FOR EACH ROW
BEGIN
    SELECT Data_Sequence.NEXTVAL
    INTO :new.data_id
    FROM dual;
END;
/
INSERT INTO Country(name) VALUES ('KR');
INSERT INTO Country(name) VALUES('JP');
INSERT INTO Country(name) VALUES('US');
INSERT INTO Country(name) VALUES('AU');
INSERT INTO Country(name) VALUES('CH');
SELECT * FROM Country;
/
INSERT INTO usr(name, email, country) VALUES('김랜덤', 'abc@example.com', (SELECT country_id FROM Country WHERE name = 'KR'));
INSERT INTO usr(name, email, country) VALUES('이랜덤', 'abc@example.com', (SELECT country_id FROM Country WHERE name = 'KR'));
INSERT INTO usr(name, email, country) VALUES('박랜덤', 'abc@example.com', (SELECT country_id FROM Country WHERE name = 'KR'));
INSERT INTO usr(name, email, country) VALUES('최랜덤', 'abc@example.com', (SELECT country_id FROM Country WHERE name = 'KR'));
INSERT INTO usr(name, email, country) VALUES('강랜덤', 'abc@example.com', (SELECT country_id FROM Country WHERE name = 'KR'));
INSERT INTO usr(name, email, country) VALUES('선우랜덤', 'abc@example.com', (SELECT country_id FROM Country WHERE name = 'KR'));

SELECT * FROM usr;
/
INSERT INTO Data(title, text, url) VALUES('웹 검색엔진 프로그램','과제 내용','https://example.com/posts/1');
INSERT INTO Data(title, text, url) VALUES('대학 지원 프로그램','대학 정보 사이트 사이트','https://example.com/posts/2');
INSERT INTO Data(title, text, url) VALUES('환율 정보 관리 및 조회 프로그램','환율 관리 프로그램','https://example.com/posts/3');
INSERT INTO Data(title, text, url) VALUES('비타민 C 제작','비타민 C에 관한 모든 것','https://example.com/posts/4');
INSERT INTO Data(title, text, url) VALUES('Python','파이썬 프로그램','https://example.com/posts/5');
INSERT INTO Data(title, text, url) VALUES('AUTOSAR에 대한 이해','자동차 표준 플랫폼','https://example.com/posts/6');
INSERT INTO Data(title, text, url) VALUES('FlexRay 네트워크','자동차 내부 고속 통신 플랫폼','https://example.com/posts/7');
INSERT INTO Data(title, text, url) VALUES('리팩토링','기술 부채를 갚는 법','https://example.com/posts/8');
INSERT INTO Data(title, text, url) VALUES('최신 공업수학','과제 내용','https://example.com/posts/9');
INSERT INTO Data(title, text, url) VALUES('자바스크립트 라이브러리','실전 활용 라이브러리','https://example.com/posts/10');

INSERT INTO Request (user_id, query, num_results) VALUES(1, 'Python', 1);
INSERT INTO Request (user_id, query, num_results) VALUES(1, 'Python', 1);
INSERT INTO Request (user_id, query, num_results) VALUES(1, 'Python', 1);
INSERT INTO Request (user_id, query, num_results) VALUES(1, 'Python', 1);
INSERT INTO Request (user_id, query, num_results) VALUES(1, 'Python', 1);
