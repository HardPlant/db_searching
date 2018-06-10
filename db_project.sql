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

INSERT INTO usr(name, email, country) VALUES('�跣��', 'abc@example.com', '�ѱ�');
INSERT INTO usr(name, email, country) VALUES('����̷�', 'abc@example.com', 'Japan');
INSERT INTO usr(name, email, country) VALUES('���', 'abc@example.com', 'Korea');
INSERT INTO usr(name, email, country) VALUES('�ռ���', 'abc@example.com', 'China');
INSERT INTO usr(name, email, country) VALUES('����Ź', 'abc@example.com', 'Vietnam');
INSERT INTO usr(name, email, country) VALUES('���췣��', 'abc@example.com', 'Indonesia');

SELECT * FROM usr;
/
INSERT INTO Data(title, text, url) VALUES('�� �˻����� ���α׷�','���� ����','https://example.com/posts/1');
INSERT INTO Data(title, text, url) VALUES('���� ���� ���α׷�','���� ���� ����Ʈ ����Ʈ','https://example.com/posts/2');
INSERT INTO Data(title, text, url) VALUES('ȯ�� ���� ���� �� ��ȸ ���α׷�','ȯ�� ���� ���α׷�','https://example.com/posts/3');
INSERT INTO Data(title, text, url) VALUES('��Ÿ�� C ����','��Ÿ�� C�� ���� ��� ��','https://example.com/posts/4');
INSERT INTO Data(title, text, url) VALUES('Python','���̽� ���α׷�','https://example.com/posts/5');
INSERT INTO Data(title, text, url) VALUES('AUTOSAR�� ���� ����','�ڵ��� ǥ�� �÷���','https://example.com/posts/6');
INSERT INTO Data(title, text, url) VALUES('FlexRay ��Ʈ��ũ','�ڵ��� ���� ��� ��� �÷���','https://example.com/posts/7');
INSERT INTO Data(title, text, url) VALUES('�����丵','��� ��ä�� ���� ��','https://example.com/posts/8');
INSERT INTO Data(title, text, url) VALUES('�ֽ� ��������','���� ����','https://example.com/posts/9');
INSERT INTO Data(title, text, url) VALUES('�ڹٽ�ũ��Ʈ ���̺귯��','���� Ȱ�� ���̺귯��','https://example.com/posts/10');

INSERT INTO Request (user_id, query, num_results) VALUES(1, 'Python', 1);
INSERT INTO Request (user_id, query, num_results) VALUES(2, 'Python', 1);
INSERT INTO Request (user_id, query, num_results) VALUES(3, 'Python', 1);
INSERT INTO Request (user_id, query, num_results) VALUES(4, 'Python', 1);
INSERT INTO Request (user_id, query, num_results) VALUES(5, 'Python', 1);

commit;