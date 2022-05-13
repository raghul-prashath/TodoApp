SET FOREIGN_KEY_CHECKS=0;
use todos;

drop table if exists works;

CREATE TABLE works(
			id int not null primary key auto_increment,
			work varchar(100)
		);