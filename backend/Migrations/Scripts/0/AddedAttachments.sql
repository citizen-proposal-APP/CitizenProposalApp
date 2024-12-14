SET NAMES utf8mb4;
CREATE TABLE IF NOT EXISTS `__EFMigrationsHistory` (
    `MigrationId` varchar(150) CHARACTER SET utf8mb4 NOT NULL,
    `ProductVersion` varchar(32) CHARACTER SET utf8mb4 NOT NULL,
    CONSTRAINT `PK___EFMigrationsHistory` PRIMARY KEY (`MigrationId`)
) CHARACTER SET=utf8mb4;

START TRANSACTION;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241111053852_InitialMigration') THEN

    ALTER DATABASE CHARACTER SET utf8mb4;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241111053852_InitialMigration') THEN

    CREATE TABLE `Tags` (
        `Id` int NOT NULL AUTO_INCREMENT,
        `Name` varchar(32) CHARACTER SET utf8mb4 NOT NULL,
        CONSTRAINT `PK_Tags` PRIMARY KEY (`Id`)
    ) CHARACTER SET=utf8mb4;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241111053852_InitialMigration') THEN

    CREATE TABLE `Users` (
        `Id` int NOT NULL AUTO_INCREMENT,
        `Username` varchar(32) CHARACTER SET utf8mb4 NOT NULL,
        `DegreeOfParallelism` int NOT NULL,
        `MemorySizeKib` int NOT NULL,
        `IterationCount` int NOT NULL,
        `Salt` varbinary(64) NOT NULL,
        `PasswordHash` varbinary(64) NOT NULL,
        CONSTRAINT `PK_Users` PRIMARY KEY (`Id`)
    ) CHARACTER SET=utf8mb4;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241111053852_InitialMigration') THEN

    CREATE TABLE `Posts` (
        `Id` int NOT NULL AUTO_INCREMENT,
        `Title` varchar(100) CHARACTER SET utf8mb4 NOT NULL,
        `Content` varchar(2000) CHARACTER SET utf8mb4 NOT NULL,
        `PostedTime` datetime(6) NOT NULL,
        `UserId` int NULL,
        CONSTRAINT `PK_Posts` PRIMARY KEY (`Id`),
        CONSTRAINT `FK_Posts_Users_UserId` FOREIGN KEY (`UserId`) REFERENCES `Users` (`Id`)
    ) CHARACTER SET=utf8mb4;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241111053852_InitialMigration') THEN

    CREATE TABLE `Sessions` (
        `Id` int NOT NULL AUTO_INCREMENT,
        `UserId` int NOT NULL,
        `Token` varbinary(64) NOT NULL,
        `ExpirationTime` datetime(6) NOT NULL,
        CONSTRAINT `PK_Sessions` PRIMARY KEY (`Id`),
        CONSTRAINT `FK_Sessions_Users_UserId` FOREIGN KEY (`UserId`) REFERENCES `Users` (`Id`) ON DELETE CASCADE
    ) CHARACTER SET=utf8mb4;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241111053852_InitialMigration') THEN

    CREATE TABLE `Comments` (
        `Id` int NOT NULL AUTO_INCREMENT,
        `PostedTime` datetime(6) NOT NULL,
        `ParentPostId` int NOT NULL,
        `AuthorId` int NOT NULL,
        `Content` varchar(200) CHARACTER SET utf8mb4 NOT NULL,
        CONSTRAINT `PK_Comments` PRIMARY KEY (`Id`),
        CONSTRAINT `FK_Comments_Posts_ParentPostId` FOREIGN KEY (`ParentPostId`) REFERENCES `Posts` (`Id`) ON DELETE CASCADE,
        CONSTRAINT `FK_Comments_Users_AuthorId` FOREIGN KEY (`AuthorId`) REFERENCES `Users` (`Id`) ON DELETE CASCADE
    ) CHARACTER SET=utf8mb4;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241111053852_InitialMigration') THEN

    CREATE TABLE `PostTag` (
        `PostsId` int NOT NULL,
        `TagsId` int NOT NULL,
        CONSTRAINT `PK_PostTag` PRIMARY KEY (`PostsId`, `TagsId`),
        CONSTRAINT `FK_PostTag_Posts_PostsId` FOREIGN KEY (`PostsId`) REFERENCES `Posts` (`Id`) ON DELETE CASCADE,
        CONSTRAINT `FK_PostTag_Tags_TagsId` FOREIGN KEY (`TagsId`) REFERENCES `Tags` (`Id`) ON DELETE CASCADE
    ) CHARACTER SET=utf8mb4;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241111053852_InitialMigration') THEN

    CREATE INDEX `IX_Comments_AuthorId` ON `Comments` (`AuthorId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241111053852_InitialMigration') THEN

    CREATE INDEX `IX_Comments_ParentPostId` ON `Comments` (`ParentPostId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241111053852_InitialMigration') THEN

    CREATE INDEX `IX_Posts_UserId` ON `Posts` (`UserId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241111053852_InitialMigration') THEN

    CREATE INDEX `IX_PostTag_TagsId` ON `PostTag` (`TagsId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241111053852_InitialMigration') THEN

    CREATE INDEX `IX_Sessions_UserId` ON `Sessions` (`UserId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241111053852_InitialMigration') THEN

    CREATE UNIQUE INDEX `IX_Tags_Name` ON `Tags` (`Name`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241111053852_InitialMigration') THEN

    CREATE UNIQUE INDEX `IX_Users_Username` ON `Users` (`Username`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241111053852_InitialMigration') THEN

    INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
    VALUES ('20241111053852_InitialMigration', '8.0.10');

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

COMMIT;

START TRANSACTION;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241112195627_AddedPostAndTagDataSeed') THEN

    INSERT INTO `Posts` (`Id`, `Content`, `PostedTime`, `Title`, `UserId`)
    VALUES (1, '隨著全球氣候變遷，農產品供需波動日益劇烈，國內農業生產也受到影響，常常造成價格起伏不定，影響農民收益。建議農業部建立更加透明且即時的農產品產銷資訊平台，讓消費者和農民可以即時掌握市場供需狀況，達到價格穩定和市場均衡的目的。透過這樣的平台，農民可以根據市場資訊調整生產策略，而消費者也能更加理解價格變動的原因，減少市場誤解，進一步穩定農業經濟。', TIMESTAMP '2024-06-09 04:02:00', '加強國內農產品產銷資訊透明化', NULL),
    (2, '中小企業是國內經濟的重要支柱，但面臨大型企業壟斷的競爭壓力不斷增加。建議公平交易委員會進一步強化對於中小企業的保護，特別是在制定反壟斷法規和規範市場行為方面，提供更加透明的申訴管道和具體的罰則，保障中小企業在市場上的公平競爭環境，進一步促進經濟的多元化與可持續發展。', TIMESTAMP '2024-06-09 04:02:00', '加強中小企業反壟斷保護措施', NULL),
    (3, '隨著人口老齡化趨勢日益加劇，老年人的醫療需求不斷上升。建議衛生福利部提供更多針對老年人的專屬醫療資源，特別是擴充護理機構及社區醫療網絡，並加強老年人健康管理的宣導。透過提高醫療資源的可及性，讓更多長者可以獲得良好的醫療照顧，減輕家庭照顧的壓力，提升全社會的福利水平。', TIMESTAMP '2024-06-09 04:02:00', '提高老年人福利及醫療資源', NULL),
    (4, '隨著交通量增加，交通事故的頻率和嚴重程度也有所提升，建議交通部實施一系列減少交通事故的措施，例如改善危險路段的道路設計，加強酒駕管制，並推廣道路安全教育，尤其是對青少年進行交通安全意識的培訓。透過這些措施，可以有效降低交通事故發生的風險，保護公共安全。', TIMESTAMP '2024-06-09 04:02:00', '建立交通事故減少措施', NULL),
    (5, '文化創意產業在推動經濟成長和提升國際影響力方面扮演重要角色。建議文化部擴充對文化創意產業的支持，例如提供更多資金補助、稅收優惠，並搭建國際平台，協助文創企業向國際市場拓展。通過這些措施，不僅能提高文化創意的產值，還可以提升國家的文化形象和軟實力。', TIMESTAMP '2024-06-09 04:02:00', '加強文化創意產業的支持政策', NULL),
    (6, '國防科技人才對於國防安全至關重要。建議國防部設立專門的科技人才培育計畫，特別是在人工智慧、網絡安全等領域，加強與國內外頂尖學府和科研機構的合作，吸引年輕人才投入國防科技的研發中。透過這種方式，能提升國防科技的自主性與創新能力，確保國家安全。', TIMESTAMP '2024-06-09 04:02:00', '建立國防科技人才培育體系', NULL),
    (7, '為了提升全體公民的生活品質，建議內政部推動更多無障礙設施的建設，包括公共交通系統、公共建築和街道設施，以便於身障人士和老年人能夠安全方便地出行。透過建立更加無障礙的社會環境，可以實現更加平等和包容的社會。', TIMESTAMP '2024-06-09 04:02:00', '加速無障礙公共設施建設', NULL),
    (8, '建議農業部推廣環境友善的農業技術，尤其是在農藥和肥料的使用上，應推動有機農業並提供相應的技術培訓和補助政策，以減少農業對環境的污染，維護生態平衡，並保障消費者的健康。', TIMESTAMP '2024-06-09 04:02:00', '促進環境友善農業', NULL),
    (9, '隨著數位化政務的推廣，資安問題變得越來越重要。建議國家通訊傳播委員會進一步提升數位政務系統的資安標準，並定期進行測試，確保市民個人資料的安全。同時，推動政府部門的資安知識培訓，提升資安意識，保障政府系統的穩定運行。', TIMESTAMP '2024-06-09 04:02:00', '加強數位政務與資安防護', NULL),
    (10, '青少年面臨學業和生活壓力增加，心理健康問題日益嚴重。建議衛生福利部設立青少年心理健康支持專線和線上諮詢服務，並在學校內提供專業的心理健康教育，幫助青少年培養健康的心態和情緒管理能力，減少心理健康問題的發生。', TIMESTAMP '2024-06-09 04:02:00', '強化青少年心理健康支持體系', NULL);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241112195627_AddedPostAndTagDataSeed') THEN

    INSERT INTO `Tags` (`Id`, `Name`)
    VALUES (1, '農業資訊'),
    (2, '價格透明化'),
    (3, '農業政策'),
    (4, '交通部'),
    (5, '中小企業'),
    (6, '反壟斷'),
    (7, '經濟多元化'),
    (8, '公平交易委員會'),
    (9, '老年人福利'),
    (10, '醫療資源'),
    (11, '健康管理'),
    (12, '衛生福利部'),
    (13, '交通安全'),
    (14, '酒駕防治'),
    (15, '公共安全'),
    (16, '行政院主計總處'),
    (17, '文化創意'),
    (18, '經濟成長'),
    (19, '國際市場'),
    (20, '文化部'),
    (21, '國防科技'),
    (22, '人才培育'),
    (23, '人工智慧'),
    (24, '國防部'),
    (25, '無障礙設施'),
    (26, '公共建設'),
    (27, '包容性社會'),
    (28, '內政部'),
    (29, '環境友善農業'),
    (30, '生態平衡'),
    (31, '農業技術'),
    (32, '農業部'),
    (33, '數位政務'),
    (34, '資安防護'),
    (35, '個人資料保護'),
    (36, '國家通訊傳播委員會'),
    (37, '青少年心理健康'),
    (38, '心理支持'),
    (39, '教育推廣'),
    (40, '教育部');

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241112195627_AddedPostAndTagDataSeed') THEN

    INSERT INTO `PostTag` (`PostsId`, `TagsId`)
    VALUES (1, 1),
    (1, 2),
    (1, 3),
    (1, 4),
    (2, 5),
    (2, 6),
    (2, 7),
    (2, 8),
    (3, 9),
    (3, 10),
    (3, 11),
    (3, 12),
    (4, 13),
    (4, 14),
    (4, 15),
    (4, 16),
    (5, 17),
    (5, 18),
    (5, 19),
    (5, 20),
    (6, 21),
    (6, 22),
    (6, 23),
    (6, 24),
    (7, 25),
    (7, 26),
    (7, 27),
    (7, 28),
    (8, 29),
    (8, 30),
    (8, 31),
    (8, 32),
    (9, 33),
    (9, 34),
    (9, 35),
    (9, 36),
    (10, 37),
    (10, 38),
    (10, 39),
    (10, 40);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241112195627_AddedPostAndTagDataSeed') THEN

    INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
    VALUES ('20241112195627_AddedPostAndTagDataSeed', '8.0.10');

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

COMMIT;

START TRANSACTION;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241115170355_AddedUnloginableUserAndPostAuthorDataSeed') THEN

    ALTER TABLE `Posts` DROP FOREIGN KEY `FK_Posts_Users_UserId`;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241115170355_AddedUnloginableUserAndPostAuthorDataSeed') THEN

    ALTER TABLE `Posts` DROP INDEX `IX_Posts_UserId`;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241115170355_AddedUnloginableUserAndPostAuthorDataSeed') THEN

    ALTER TABLE `Posts` DROP COLUMN `UserId`;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241115170355_AddedUnloginableUserAndPostAuthorDataSeed') THEN

    ALTER TABLE `Users` ADD `Loginable` tinyint(1) NOT NULL DEFAULT FALSE;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241115170355_AddedUnloginableUserAndPostAuthorDataSeed') THEN

    ALTER TABLE `Posts` ADD `AuthorId` int NOT NULL DEFAULT 0;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241115170355_AddedUnloginableUserAndPostAuthorDataSeed') THEN

    UPDATE `Posts` SET `AuthorId` = 1
    WHERE `Id` = 1;
    SELECT ROW_COUNT();


    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241115170355_AddedUnloginableUserAndPostAuthorDataSeed') THEN

    UPDATE `Posts` SET `AuthorId` = 1
    WHERE `Id` = 2;
    SELECT ROW_COUNT();


    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241115170355_AddedUnloginableUserAndPostAuthorDataSeed') THEN

    UPDATE `Posts` SET `AuthorId` = 1
    WHERE `Id` = 3;
    SELECT ROW_COUNT();


    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241115170355_AddedUnloginableUserAndPostAuthorDataSeed') THEN

    UPDATE `Posts` SET `AuthorId` = 1
    WHERE `Id` = 4;
    SELECT ROW_COUNT();


    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241115170355_AddedUnloginableUserAndPostAuthorDataSeed') THEN

    UPDATE `Posts` SET `AuthorId` = 1
    WHERE `Id` = 5;
    SELECT ROW_COUNT();


    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241115170355_AddedUnloginableUserAndPostAuthorDataSeed') THEN

    UPDATE `Posts` SET `AuthorId` = 1
    WHERE `Id` = 6;
    SELECT ROW_COUNT();


    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241115170355_AddedUnloginableUserAndPostAuthorDataSeed') THEN

    UPDATE `Posts` SET `AuthorId` = 1
    WHERE `Id` = 7;
    SELECT ROW_COUNT();


    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241115170355_AddedUnloginableUserAndPostAuthorDataSeed') THEN

    UPDATE `Posts` SET `AuthorId` = 1
    WHERE `Id` = 8;
    SELECT ROW_COUNT();


    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241115170355_AddedUnloginableUserAndPostAuthorDataSeed') THEN

    UPDATE `Posts` SET `AuthorId` = 1
    WHERE `Id` = 9;
    SELECT ROW_COUNT();


    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241115170355_AddedUnloginableUserAndPostAuthorDataSeed') THEN

    UPDATE `Posts` SET `AuthorId` = 1
    WHERE `Id` = 10;
    SELECT ROW_COUNT();


    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241115170355_AddedUnloginableUserAndPostAuthorDataSeed') THEN

    INSERT INTO `Users` (`Id`, `DegreeOfParallelism`, `IterationCount`, `Loginable`, `MemorySizeKib`, `PasswordHash`, `Salt`, `Username`)
    VALUES (1, 0, 0, FALSE, 0, X'', X'', 'DemoUser');

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241115170355_AddedUnloginableUserAndPostAuthorDataSeed') THEN

    CREATE INDEX `IX_Posts_AuthorId` ON `Posts` (`AuthorId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241115170355_AddedUnloginableUserAndPostAuthorDataSeed') THEN

    ALTER TABLE `Posts` ADD CONSTRAINT `FK_Posts_Users_AuthorId` FOREIGN KEY (`AuthorId`) REFERENCES `Users` (`Id`) ON DELETE CASCADE;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241115170355_AddedUnloginableUserAndPostAuthorDataSeed') THEN

    INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
    VALUES ('20241115170355_AddedUnloginableUserAndPostAuthorDataSeed', '8.0.10');

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

COMMIT;

START TRANSACTION;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241121015153_AddedTagType') THEN

    ALTER TABLE `Tags` ADD `TagTypeId` int NOT NULL DEFAULT 0;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241121015153_AddedTagType') THEN

    CREATE TABLE `TagTypes` (
        `Id` int NOT NULL,
        `Name` varchar(32) CHARACTER SET utf8mb4 NOT NULL,
        CONSTRAINT `PK_TagTypes` PRIMARY KEY (`Id`)
    ) CHARACTER SET=utf8mb4;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241121015153_AddedTagType') THEN

    INSERT INTO `TagTypes` (`Id`, `Name`)
    VALUES (0, 'none'),
    (1, 'department'),
    (2, 'topic');

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241121015153_AddedTagType') THEN

    UPDATE `Tags` SET `TagTypeId` = 2
    WHERE `Id` = 1;
    SELECT ROW_COUNT();


    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241121015153_AddedTagType') THEN

    UPDATE `Tags` SET `TagTypeId` = 2
    WHERE `Id` = 2;
    SELECT ROW_COUNT();


    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241121015153_AddedTagType') THEN

    UPDATE `Tags` SET `TagTypeId` = 2
    WHERE `Id` = 3;
    SELECT ROW_COUNT();


    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241121015153_AddedTagType') THEN

    UPDATE `Tags` SET `TagTypeId` = 1
    WHERE `Id` = 4;
    SELECT ROW_COUNT();


    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241121015153_AddedTagType') THEN

    UPDATE `Tags` SET `TagTypeId` = 2
    WHERE `Id` = 5;
    SELECT ROW_COUNT();


    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241121015153_AddedTagType') THEN

    UPDATE `Tags` SET `TagTypeId` = 2
    WHERE `Id` = 6;
    SELECT ROW_COUNT();


    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241121015153_AddedTagType') THEN

    UPDATE `Tags` SET `TagTypeId` = 2
    WHERE `Id` = 7;
    SELECT ROW_COUNT();


    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241121015153_AddedTagType') THEN

    UPDATE `Tags` SET `TagTypeId` = 1
    WHERE `Id` = 8;
    SELECT ROW_COUNT();


    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241121015153_AddedTagType') THEN

    UPDATE `Tags` SET `TagTypeId` = 2
    WHERE `Id` = 9;
    SELECT ROW_COUNT();


    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241121015153_AddedTagType') THEN

    UPDATE `Tags` SET `TagTypeId` = 2
    WHERE `Id` = 10;
    SELECT ROW_COUNT();


    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241121015153_AddedTagType') THEN

    UPDATE `Tags` SET `TagTypeId` = 2
    WHERE `Id` = 11;
    SELECT ROW_COUNT();


    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241121015153_AddedTagType') THEN

    UPDATE `Tags` SET `TagTypeId` = 1
    WHERE `Id` = 12;
    SELECT ROW_COUNT();


    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241121015153_AddedTagType') THEN

    UPDATE `Tags` SET `TagTypeId` = 2
    WHERE `Id` = 13;
    SELECT ROW_COUNT();


    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241121015153_AddedTagType') THEN

    UPDATE `Tags` SET `TagTypeId` = 2
    WHERE `Id` = 14;
    SELECT ROW_COUNT();


    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241121015153_AddedTagType') THEN

    UPDATE `Tags` SET `TagTypeId` = 2
    WHERE `Id` = 15;
    SELECT ROW_COUNT();


    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241121015153_AddedTagType') THEN

    UPDATE `Tags` SET `TagTypeId` = 1
    WHERE `Id` = 16;
    SELECT ROW_COUNT();


    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241121015153_AddedTagType') THEN

    UPDATE `Tags` SET `TagTypeId` = 2
    WHERE `Id` = 17;
    SELECT ROW_COUNT();


    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241121015153_AddedTagType') THEN

    UPDATE `Tags` SET `TagTypeId` = 2
    WHERE `Id` = 18;
    SELECT ROW_COUNT();


    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241121015153_AddedTagType') THEN

    UPDATE `Tags` SET `TagTypeId` = 2
    WHERE `Id` = 19;
    SELECT ROW_COUNT();


    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241121015153_AddedTagType') THEN

    UPDATE `Tags` SET `TagTypeId` = 1
    WHERE `Id` = 20;
    SELECT ROW_COUNT();


    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241121015153_AddedTagType') THEN

    UPDATE `Tags` SET `TagTypeId` = 2
    WHERE `Id` = 21;
    SELECT ROW_COUNT();


    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241121015153_AddedTagType') THEN

    UPDATE `Tags` SET `TagTypeId` = 2
    WHERE `Id` = 22;
    SELECT ROW_COUNT();


    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241121015153_AddedTagType') THEN

    UPDATE `Tags` SET `TagTypeId` = 2
    WHERE `Id` = 23;
    SELECT ROW_COUNT();


    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241121015153_AddedTagType') THEN

    UPDATE `Tags` SET `TagTypeId` = 1
    WHERE `Id` = 24;
    SELECT ROW_COUNT();


    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241121015153_AddedTagType') THEN

    UPDATE `Tags` SET `TagTypeId` = 2
    WHERE `Id` = 25;
    SELECT ROW_COUNT();


    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241121015153_AddedTagType') THEN

    UPDATE `Tags` SET `TagTypeId` = 2
    WHERE `Id` = 26;
    SELECT ROW_COUNT();


    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241121015153_AddedTagType') THEN

    UPDATE `Tags` SET `TagTypeId` = 2
    WHERE `Id` = 27;
    SELECT ROW_COUNT();


    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241121015153_AddedTagType') THEN

    UPDATE `Tags` SET `TagTypeId` = 1
    WHERE `Id` = 28;
    SELECT ROW_COUNT();


    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241121015153_AddedTagType') THEN

    UPDATE `Tags` SET `TagTypeId` = 2
    WHERE `Id` = 29;
    SELECT ROW_COUNT();


    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241121015153_AddedTagType') THEN

    UPDATE `Tags` SET `TagTypeId` = 2
    WHERE `Id` = 30;
    SELECT ROW_COUNT();


    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241121015153_AddedTagType') THEN

    UPDATE `Tags` SET `TagTypeId` = 2
    WHERE `Id` = 31;
    SELECT ROW_COUNT();


    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241121015153_AddedTagType') THEN

    UPDATE `Tags` SET `TagTypeId` = 1
    WHERE `Id` = 32;
    SELECT ROW_COUNT();


    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241121015153_AddedTagType') THEN

    UPDATE `Tags` SET `TagTypeId` = 2
    WHERE `Id` = 33;
    SELECT ROW_COUNT();


    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241121015153_AddedTagType') THEN

    UPDATE `Tags` SET `TagTypeId` = 2
    WHERE `Id` = 34;
    SELECT ROW_COUNT();


    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241121015153_AddedTagType') THEN

    UPDATE `Tags` SET `TagTypeId` = 2
    WHERE `Id` = 35;
    SELECT ROW_COUNT();


    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241121015153_AddedTagType') THEN

    UPDATE `Tags` SET `TagTypeId` = 1
    WHERE `Id` = 36;
    SELECT ROW_COUNT();


    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241121015153_AddedTagType') THEN

    UPDATE `Tags` SET `TagTypeId` = 2
    WHERE `Id` = 37;
    SELECT ROW_COUNT();


    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241121015153_AddedTagType') THEN

    UPDATE `Tags` SET `TagTypeId` = 2
    WHERE `Id` = 38;
    SELECT ROW_COUNT();


    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241121015153_AddedTagType') THEN

    UPDATE `Tags` SET `TagTypeId` = 2
    WHERE `Id` = 39;
    SELECT ROW_COUNT();


    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241121015153_AddedTagType') THEN

    UPDATE `Tags` SET `TagTypeId` = 1
    WHERE `Id` = 40;
    SELECT ROW_COUNT();


    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241121015153_AddedTagType') THEN

    CREATE INDEX `IX_Tags_TagTypeId` ON `Tags` (`TagTypeId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241121015153_AddedTagType') THEN

    ALTER TABLE `Tags` ADD CONSTRAINT `FK_Tags_TagTypes_TagTypeId` FOREIGN KEY (`TagTypeId`) REFERENCES `TagTypes` (`Id`) ON DELETE CASCADE;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241121015153_AddedTagType') THEN

    INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
    VALUES ('20241121015153_AddedTagType', '8.0.10');

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

COMMIT;

START TRANSACTION;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241123120947_AddedSessionTokenUniqueIndex') THEN

    CREATE UNIQUE INDEX `IX_Sessions_Token` ON `Sessions` (`Token`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241123120947_AddedSessionTokenUniqueIndex') THEN

    INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
    VALUES ('20241123120947_AddedSessionTokenUniqueIndex', '8.0.10');

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

COMMIT;

START TRANSACTION;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241124080645_ChangedDateTimeToDateTimeOffset') THEN

    UPDATE `Posts` SET `PostedTime` = TIMESTAMP '2024-06-09 04:02:00'
    WHERE `Id` = 1;
    SELECT ROW_COUNT();


    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241124080645_ChangedDateTimeToDateTimeOffset') THEN

    UPDATE `Posts` SET `PostedTime` = TIMESTAMP '2024-06-09 04:02:00'
    WHERE `Id` = 2;
    SELECT ROW_COUNT();


    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241124080645_ChangedDateTimeToDateTimeOffset') THEN

    UPDATE `Posts` SET `PostedTime` = TIMESTAMP '2024-06-09 04:02:00'
    WHERE `Id` = 3;
    SELECT ROW_COUNT();


    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241124080645_ChangedDateTimeToDateTimeOffset') THEN

    UPDATE `Posts` SET `PostedTime` = TIMESTAMP '2024-06-09 04:02:00'
    WHERE `Id` = 4;
    SELECT ROW_COUNT();


    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241124080645_ChangedDateTimeToDateTimeOffset') THEN

    UPDATE `Posts` SET `PostedTime` = TIMESTAMP '2024-06-09 04:02:00'
    WHERE `Id` = 5;
    SELECT ROW_COUNT();


    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241124080645_ChangedDateTimeToDateTimeOffset') THEN

    UPDATE `Posts` SET `PostedTime` = TIMESTAMP '2024-06-09 04:02:00'
    WHERE `Id` = 6;
    SELECT ROW_COUNT();


    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241124080645_ChangedDateTimeToDateTimeOffset') THEN

    UPDATE `Posts` SET `PostedTime` = TIMESTAMP '2024-06-09 04:02:00'
    WHERE `Id` = 7;
    SELECT ROW_COUNT();


    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241124080645_ChangedDateTimeToDateTimeOffset') THEN

    UPDATE `Posts` SET `PostedTime` = TIMESTAMP '2024-06-09 04:02:00'
    WHERE `Id` = 8;
    SELECT ROW_COUNT();


    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241124080645_ChangedDateTimeToDateTimeOffset') THEN

    UPDATE `Posts` SET `PostedTime` = TIMESTAMP '2024-06-09 04:02:00'
    WHERE `Id` = 9;
    SELECT ROW_COUNT();


    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241124080645_ChangedDateTimeToDateTimeOffset') THEN

    UPDATE `Posts` SET `PostedTime` = TIMESTAMP '2024-06-09 04:02:00'
    WHERE `Id` = 10;
    SELECT ROW_COUNT();


    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241124080645_ChangedDateTimeToDateTimeOffset') THEN

    INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
    VALUES ('20241124080645_ChangedDateTimeToDateTimeOffset', '8.0.10');

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

COMMIT;

START TRANSACTION;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241203135436_AddedAttachments') THEN

    CREATE TABLE `Attachments` (
        `Id` int NOT NULL AUTO_INCREMENT,
        `Content` LONGBLOB NOT NULL,
        `Filename` varchar(256) CHARACTER SET utf8mb4 NOT NULL,
        `ParentPostId` int NOT NULL,
        CONSTRAINT `PK_Attachments` PRIMARY KEY (`Id`),
        CONSTRAINT `FK_Attachments_Posts_ParentPostId` FOREIGN KEY (`ParentPostId`) REFERENCES `Posts` (`Id`) ON DELETE CASCADE
    ) CHARACTER SET=utf8mb4;

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241203135436_AddedAttachments') THEN

    CREATE INDEX `IX_Attachments_ParentPostId` ON `Attachments` (`ParentPostId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20241203135436_AddedAttachments') THEN

    INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
    VALUES ('20241203135436_AddedAttachments', '8.0.10');

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

COMMIT;

