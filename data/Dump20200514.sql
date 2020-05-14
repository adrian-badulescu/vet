-- MySQL dump 10.13  Distrib 8.0.20, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: farm
-- ------------------------------------------------------
-- Server version	8.0.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `activitate`
--

DROP TABLE IF EXISTS `activitate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activitate` (
  `id` varchar(50) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `startDate` datetime(6) DEFAULT NULL,
  `endDate` datetime(6) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `responsiblePers` varchar(50) DEFAULT NULL,
  `categories` varchar(50) DEFAULT NULL,
  `subCategories` varchar(50) DEFAULT NULL,
  `fields` varchar(50) DEFAULT NULL,
  `cultureProduction` varchar(50) DEFAULT NULL,
  `season` varchar(50) DEFAULT NULL,
  `seasonStartDate` datetime(6) DEFAULT NULL,
  `seasonEndDate` datetime(6) DEFAULT NULL,
  `obs` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activitate`
--

LOCK TABLES `activitate` WRITE;
/*!40000 ALTER TABLE `activitate` DISABLE KEYS */;
INSERT INTO `activitate` VALUES ('7e67f6ab-b67b-bd2a-d6fe-c69176f5379a','aedcfsss','2020-03-05 00:00:00.000000','2020-03-12 00:00:00.000000','awaiting','A','Fertilizare','Fertilizanti Artificiali','A','A','Primavara','2020-03-05 00:00:00.000000','2020-03-09 00:00:00.000000','sss');
/*!40000 ALTER TABLE `activitate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `buget`
--

DROP TABLE IF EXISTS `buget`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `buget` (
  `id` varchar(50) NOT NULL,
  `name` varchar(128) DEFAULT NULL,
  `startDate` datetime(6) DEFAULT NULL,
  `endDate` datetime(6) DEFAULT NULL,
  `budgetCenters` varchar(128) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `generalBudget` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buget`
--

LOCK TABLES `buget` WRITE;
/*!40000 ALTER TABLE `buget` DISABLE KEYS */;
INSERT INTO `buget` VALUES ('bfd5d9f8-ca2d-63e0-f836-6d513efb861c','wdqdqqw','2020-03-21 00:00:00.000000','2020-03-28 00:00:00.000000','A','ciorna',1);
/*!40000 ALTER TABLE `buget` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bunuri`
--

DROP TABLE IF EXISTS `bunuri`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bunuri` (
  `id` varchar(50) NOT NULL,
  `object` varchar(50) DEFAULT NULL,
  `startDate` datetime(6) DEFAULT NULL,
  `startValue` int DEFAULT NULL,
  `currentValue` int DEFAULT NULL,
  `currentAge` int DEFAULT NULL,
  `deprecPeriod` int DEFAULT NULL,
  `deprecRate` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bunuri`
--

LOCK TABLES `bunuri` WRITE;
/*!40000 ALTER TABLE `bunuri` DISABLE KEYS */;
/*!40000 ALTER TABLE `bunuri` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `db_queries_entity`
--

DROP TABLE IF EXISTS `db_queries_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `db_queries_entity` (
  `alias` varchar(255) NOT NULL,
  `query` varchar(255) NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `db_queries_entity`
--

LOCK TABLES `db_queries_entity` WRITE;
/*!40000 ALTER TABLE `db_queries_entity` DISABLE KEYS */;
INSERT INTO `db_queries_entity` VALUES ('reg','select id, grpId, sex, exitDate FROM reg',1),('uniquegrpids','SELECT distinct grpId FROM reg',2),('idsbygrp','SELECT id from reg WHERE grpId = \'Ovine-Dorset-F\'',3);
/*!40000 ALTER TABLE `db_queries_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `desinfestations`
--

DROP TABLE IF EXISTS `desinfestations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `desinfestations` (
  `id` varchar(50) NOT NULL,
  `animalId` varchar(128) DEFAULT NULL,
  `grpId` varchar(128) DEFAULT NULL,
  `grpAdm` varchar(128) DEFAULT NULL,
  `vetName` varchar(128) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `sex` varchar(20) DEFAULT NULL,
  `gestating` tinyint(1) DEFAULT NULL,
  `weight` int DEFAULT NULL,
  `height` int DEFAULT NULL,
  `temp` int DEFAULT NULL,
  `desinfestationApplied` varchar(128) DEFAULT NULL,
  `qty` int DEFAULT NULL,
  `measurementUnit` varchar(50) DEFAULT NULL,
  `measurementUnit2` varchar(50) DEFAULT NULL,
  `admType` varchar(50) DEFAULT NULL,
  `desinfestationDate` datetime(6) DEFAULT NULL,
  `obs` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `desinfestations`
--

LOCK TABLES `desinfestations` WRITE;
/*!40000 ALTER TABLE `desinfestations` DISABLE KEYS */;
/*!40000 ALTER TABLE `desinfestations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `emailverification`
--

DROP TABLE IF EXISTS `emailverification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emailverification` (
  `email` varchar(255) NOT NULL,
  `emailToken` varchar(255) NOT NULL,
  `timeStamp` datetime NOT NULL,
  `id` varchar(36) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emailverification`
--

LOCK TABLES `emailverification` WRITE;
/*!40000 ALTER TABLE `emailverification` DISABLE KEYS */;
INSERT INTO `emailverification` VALUES ('adinaartene5@gmail.com','8969286','2020-05-13 16:54:16','5808bb34-4dee-4e8f-ab99-cff80ba1529b'),('adina.artene@yahoo.com','7014726','2020-05-13 16:53:06','e5c39f20-2980-4483-9843-7b1cbcac8358');
/*!40000 ALTER TABLE `emailverification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `exit_animals`
--

DROP TABLE IF EXISTS `exit_animals`;
/*!50001 DROP VIEW IF EXISTS `exit_animals`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `exit_animals` AS SELECT 
 1 AS `gestating`,
 1 AS `weight`,
 1 AS `grpId`,
 1 AS `species`,
 1 AS `breed`,
 1 AS `sex`,
 1 AS `creationDate`,
 1 AS `crotaliuId`,
 1 AS `dateOfBirth`,
 1 AS `meatOrMilk`,
 1 AS `parentMId`,
 1 AS `parentFId`,
 1 AS `exitDate`,
 1 AS `stage`,
 1 AS `age`,
 1 AS `id`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `folders`
--

DROP TABLE IF EXISTS `folders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `folders` (
  `id` varchar(256) NOT NULL,
  `denumire` varchar(128) DEFAULT NULL,
  `parinteId` varchar(50) DEFAULT NULL,
  `description` varchar(128) DEFAULT NULL,
  `isFile` int DEFAULT NULL,
  `nameFile` varchar(50) DEFAULT NULL,
  `createAt` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`(255))
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `folders`
--

LOCK TABLES `folders` WRITE;
/*!40000 ALTER TABLE `folders` DISABLE KEYS */;
/*!40000 ALTER TABLE `folders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `folders_structure`
--

DROP TABLE IF EXISTS `folders_structure`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `folders_structure` (
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `id` int NOT NULL AUTO_INCREMENT,
  `denumire` text NOT NULL,
  `description` text NOT NULL,
  `isFile` bit(1) NOT NULL,
  `nameFile` text NOT NULL,
  `parinteId` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `folders_structure`
--

LOCK TABLES `folders_structure` WRITE;
/*!40000 ALTER TABLE `folders_structure` DISABLE KEYS */;
/*!40000 ALTER TABLE `folders_structure` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `forgottenpasswordtoken`
--

DROP TABLE IF EXISTS `forgottenpasswordtoken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `forgottenpasswordtoken` (
  `email` varchar(255) NOT NULL,
  `newPasswordToken` varchar(255) NOT NULL,
  `timeStamp` datetime NOT NULL,
  `id` varchar(36) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forgottenpasswordtoken`
--

LOCK TABLES `forgottenpasswordtoken` WRITE;
/*!40000 ALTER TABLE `forgottenpasswordtoken` DISABLE KEYS */;
INSERT INTO `forgottenpasswordtoken` VALUES ('adrianb2104@yahoo.com','1852622','2020-02-06 19:42:57',''),('adrianb2104@gmail.com','3039920','2020-05-13 17:12:30','985a08d0-b55a-4079-9287-bf85b1c6d349'),('adrianb2104@gmail.com','8993680','2020-05-13 17:44:49','9de69769-5a7b-49d5-98ce-b5337e96cfcd'),('adrianb2104@yahoo.com','5301311','2020-05-13 17:42:55','b097e34b-4333-40cb-aacb-3e0eda745f29'),('adrianb2104@gmail.com','6772125','2020-05-13 17:43:49','d3185076-2f28-4bbc-932a-77f016bee6d2'),('adrianb2104@gmail.com','7980716','2020-05-13 17:43:05','f7006137-1daa-4139-8810-15ebe852ae10'),('adrianb2104@yahoo.com','2411026','2020-05-13 17:20:30','f73e0704-37cc-49a1-a664-4f38cb3ffa99');
/*!40000 ALTER TABLE `forgottenpasswordtoken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `furajarebeef`
--

DROP TABLE IF EXISTS `furajarebeef`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `furajarebeef` (
  `id` varchar(50) NOT NULL,
  `grpId` varchar(50) DEFAULT NULL,
  `personalId` varchar(50) DEFAULT NULL,
  `febValue` varchar(20) DEFAULT NULL,
  `DM` int DEFAULT NULL,
  `ME` int DEFAULT NULL,
  `CP` int DEFAULT NULL,
  `water` int DEFAULT NULL,
  `suckerCows500Kg` int DEFAULT NULL,
  `InCalfHeifers450Kg` int DEFAULT NULL,
  `growingFinishingCattleYear1` int DEFAULT NULL,
  `growingFinishingCattleYear2` int DEFAULT NULL,
  `totalEnergy1Y_ME` int DEFAULT NULL,
  `grazingLaxControl` int DEFAULT NULL,
  `grazing` int DEFAULT NULL,
  `roughGrazing` int DEFAULT NULL,
  `twoCutSilage` int DEFAULT NULL,
  `firstCutSilage` int DEFAULT NULL,
  `calculusGrazing` int DEFAULT NULL,
  `wholecropSilage` int DEFAULT NULL,
  `otherConservedSilage` int DEFAULT NULL,
  `totalGrassAndForageEnergySupply` int DEFAULT NULL,
  `straw` int DEFAULT NULL,
  `rapeseedMeal` int DEFAULT NULL,
  `totalBoughtEnergySupply` int DEFAULT NULL,
  `totalFarmEnergySupply` int DEFAULT NULL,
  `supply` int DEFAULT NULL,
  `minus` int DEFAULT NULL,
  `demand` int DEFAULT NULL,
  `balance` int DEFAULT NULL,
  `plusMinus` int DEFAULT NULL,
  `date` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `furajarebeef`
--

LOCK TABLES `furajarebeef` WRITE;
/*!40000 ALTER TABLE `furajarebeef` DISABLE KEYS */;
/*!40000 ALTER TABLE `furajarebeef` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `group_permissions`
--

DROP TABLE IF EXISTS `group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `group_permissions` (
  `permission_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`permission_id`,`group_id`),
  KEY `IDX_7514fdc446a1fdcf5b2d39cda6` (`permission_id`),
  KEY `IDX_3924be6485a5b5d0d2fe1a94c0` (`group_id`),
  CONSTRAINT `FK_3924be6485a5b5d0d2fe1a94c08` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_7514fdc446a1fdcf5b2d39cda60` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group_permissions`
--

LOCK TABLES `group_permissions` WRITE;
/*!40000 ALTER TABLE `group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groups`
--

DROP TABLE IF EXISTS `groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `groups` (
  `name` varchar(100) NOT NULL DEFAULT '',
  `title` varchar(255) NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_664ea405ae2a10c264d582ee56` (`name`),
  UNIQUE KEY `IDX_6b70c09fbdab1399c207d91f41` (`title`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groups`
--

LOCK TABLES `groups` WRITE;
/*!40000 ALTER TABLE `groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inv_inventory`
--

DROP TABLE IF EXISTS `inv_inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inv_inventory` (
  `id` varchar(50) NOT NULL,
  `name` varchar(128) NOT NULL,
  `description` varchar(1024) DEFAULT NULL,
  `warehouseid` varchar(50) DEFAULT NULL,
  `typeid` varchar(50) DEFAULT NULL,
  `activ` int DEFAULT NULL,
  `is_virtual` int DEFAULT NULL,
  `consumption` int DEFAULT NULL,
  `delivery` int DEFAULT NULL,
  `receipt` int DEFAULT NULL,
  `adjustment` int DEFAULT NULL,
  `reservation` int DEFAULT NULL,
  `ownerid` varchar(50) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inv_inventory`
--

LOCK TABLES `inv_inventory` WRITE;
/*!40000 ALTER TABLE `inv_inventory` DISABLE KEYS */;
/*!40000 ALTER TABLE `inv_inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logs`
--

DROP TABLE IF EXISTS `logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `logs` (
  `id` varchar(36) NOT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `user` varchar(50) NOT NULL,
  `module` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logs`
--

LOCK TABLES `logs` WRITE;
/*!40000 ALTER TABLE `logs` DISABLE KEYS */;
INSERT INTO `logs` VALUES ('01c957f9-ec08-4755-9a4f-03687e5461f7','2020-05-11 16:05:18','2020-05-11 16:05:18','adrianb2104@gmail.com','A intrat in aplicatie'),('04d8b21d-0f2b-4fa1-8ef3-7ab5825bd9a0','2020-05-13 16:01:07','2020-05-13 16:01:07','adrianb2104@gmail.com','A intrat in aplicatie'),('05020340-1ade-4dd2-9568-85578ab1990c','2020-05-10 20:27:14','2020-05-10 20:27:14','adrianb2104@gmail.com','A intrat in aplicatie'),('052413de-ed6f-4a65-ae88-ad5571997145','2020-05-14 12:14:22','2020-05-14 12:14:22','adrianb2104@gmail.com','A intrat in aplicatie'),('05527bab-c338-4877-a378-12534edbc517','2020-05-11 14:07:53','2020-05-11 14:07:53','adrianb2104@gmail.com','A intrat in aplicatie'),('059ef42f-a0c6-45bf-aa18-e45a2c00ae0c','2020-05-11 15:58:15','2020-05-11 15:58:15','adrianb2104@gmail.com','A intrat in aplicatie'),('0a85aaa1-6702-4716-b804-bd3983cf21e4','2020-05-14 12:46:27','2020-05-14 12:46:27','adrianb2104@gmail.com','A intrat in aplicatie'),('0e4c1ce7-14cd-4725-b9bd-1195425374de','2020-05-10 20:57:12','2020-05-10 20:57:12','adrianb2104@gmail.com','A intrat in aplicatie'),('0ecd6d89-9248-4e34-9579-4925e43bc575','2020-05-10 17:48:50','2020-05-10 17:48:50','adrianb2104@gmail.com','A intrat in aplicatie'),('0f20f56c-6b9f-4172-9336-9d6b7e823290','2020-05-11 11:32:22','2020-05-11 11:32:22','adrianb2104@gmail.com','A intrat in aplicatie'),('0f4f25e7-3994-4f90-92ff-eb78dbb59557','2020-05-11 14:06:31','2020-05-11 14:06:31','adrianb2104@gmail.com','A intrat in aplicatie'),('103b886d-fdbf-441a-8458-b4aecf449f84','2020-05-14 11:49:48','2020-05-14 12:13:17','adrianb2104@gmail.com','/dashboards/dashboard-1'),('133c301a-2b60-4d1c-bf3d-396208a1a8dc','2020-05-10 21:03:59','2020-05-10 21:03:59','adrianb2104@gmail.com','A intrat in aplicatie'),('13ab27f1-f5b0-43fc-bc09-08d4fac24d8d','2020-05-10 13:30:16','2020-05-10 13:30:17','adrianb2104@gmail.com','/farm/reg'),('13bae60b-babe-4346-a76c-0d5e7b296944','2020-05-10 13:30:08','2020-05-10 13:30:09','adrianb2104@gmail.com','/farm/tratamente'),('1500787c-0037-41fd-a162-275cbde5bef9','2020-05-14 12:47:48','2020-05-14 12:47:48','adrianb2104@gmail.com','A intrat in aplicatie'),('153fce08-32e2-4437-8d09-966e39ca3aef','2020-05-10 17:52:31','2020-05-10 17:52:31','adrianb2104@gmail.com','A intrat in aplicatie'),('189adddc-ba4b-4a1d-ac02-316bb8600b7c','2020-05-10 13:29:47','2020-05-10 13:30:06','adrianb2104@gmail.com','/reports/user-tracker'),('1d309d4a-5402-4f6c-a9a5-f14c891b2535','2020-05-14 12:45:35','2020-05-14 12:45:35','adrianb2104@gmail.com','A intrat in aplicatie'),('1db9f254-f296-46a6-a816-c5f1dae0d6e4','2020-05-11 13:53:50','2020-05-11 13:53:50','adrianb2104@gmail.com','A intrat in aplicatie'),('1e0388d7-f758-4f13-a188-ac0c03dc19d5','2020-05-10 20:34:37','2020-05-10 20:34:37','adrianb2104@gmail.com','A intrat in aplicatie'),('1ec09c2a-13ac-46f2-81b3-a3c1eeeda813','2020-05-10 15:43:03','2020-05-10 15:43:03','adrianb2104@gmail.com','A intrat in aplicatie'),('21c9b615-a595-40c1-8338-aa3a0f9fc4ee','2020-05-11 15:32:01','2020-05-11 15:32:01','adrianb2104@gmail.com','A intrat in aplicatie'),('227385d7-ff35-4aec-a7e3-50727a68ab1b','2020-05-10 13:30:10','2020-05-10 13:30:10','adrianb2104@gmail.com','/farm/tratamentegrup'),('22973c43-924a-4dd4-96c1-66d3b1ae8079','2020-05-11 13:51:13','2020-05-11 13:51:13','adrianb2104@gmail.com','A intrat in aplicatie'),('24755c65-0624-4469-a327-480641a3ce19','2020-05-11 15:05:47','2020-05-11 15:05:47','adrianb2104@gmail.com','A intrat in aplicatie'),('2710f976-0070-4c29-ad17-7c4d383c2f77','2020-05-11 15:36:12','2020-05-11 15:36:15','adrianb2104@gmail.com','/dashboards/dashboard-1'),('284538e5-6a5c-4aa9-9adc-73b70401fd5f','2020-05-10 21:04:56','2020-05-10 21:04:56','adrianb2104@gmail.com','A intrat in aplicatie'),('2c16b11e-3e89-4cfc-8a91-bb5e833f8d18','2020-05-11 15:52:50','2020-05-11 15:52:50','adrianb2104@gmail.com','A intrat in aplicatie'),('2cd87007-65c5-4f1c-9650-53b98a0d156b','2020-05-11 13:59:28','2020-05-11 13:59:28','adrianb2104@gmail.com','A intrat in aplicatie'),('30404bb8-6704-4855-bbef-d84bcfb68339','2020-05-10 17:52:01','2020-05-10 17:52:01','adrianb2104@gmail.com','A intrat in aplicatie'),('311fab3f-4d8a-4ca1-a223-420958f10af3','2020-05-10 17:54:40','2020-05-10 17:54:40','adrianb2104@gmail.com','A intrat in aplicatie'),('31f3ccc6-956e-4f09-9049-364e9d4ebcda','2020-05-11 15:10:30','2020-05-11 15:10:30','adrianb2104@gmail.com','A intrat in aplicatie'),('36b6453d-369f-4a7d-9de5-d2c00f4f7bf8','2020-05-11 16:20:10','2020-05-11 16:20:10','adrianb2104@gmail.com','A intrat in aplicatie'),('36d85bcf-ced6-40b0-84ce-d627ccaa303d','2020-05-10 18:56:04','2020-05-10 18:56:04','adrianb2104@gmail.com','A intrat in aplicatie'),('38830621-daf9-43c1-886e-5ec8f2698629','2020-05-11 14:04:55','2020-05-11 14:04:55','adrianb2104@gmail.com','A intrat in aplicatie'),('38bcbeed-4d89-408b-8e31-08e47e3492fc','2020-05-10 14:38:59','2020-05-10 14:38:59','adrianb2104@gmail.com','A intrat in aplicatie'),('38dc0dc8-6d92-468b-858c-1d2e5fdb52de','2020-05-10 15:27:53','2020-05-10 15:27:53','adrianb2104@gmail.com','A intrat in aplicatie'),('3c313019-7672-4c48-b2c5-c1c28d56a30e','2020-05-10 20:35:14','2020-05-10 20:35:14','adrianb2104@gmail.com','A intrat in aplicatie'),('4445a05c-9602-4bd2-984a-5b63dda99f59','2020-05-11 14:47:06','2020-05-11 14:47:06','adrianb2104@gmail.com','A intrat in aplicatie'),('473fd9cf-8d74-4761-9667-22334a660b0e','2020-05-10 20:34:01','2020-05-10 20:34:01','adrianb2104@gmail.com','A intrat in aplicatie'),('477b2772-2d2f-4fdc-8dc3-b74ae1ff3713','2020-05-11 14:05:39','2020-05-11 14:05:39','adrianb2104@gmail.com','A intrat in aplicatie'),('48230720-97ae-4a7f-bd68-3cd350e81de2','2020-05-11 13:50:34','2020-05-11 13:50:34','adrianb2104@gmail.com','A intrat in aplicatie'),('48807baf-99f0-406e-9775-6adc4b9069ec','2020-05-14 12:47:51','2020-05-14 12:47:51','adrianb2104@gmail.com','A intrat in aplicatie'),('4b773846-ba30-4d78-ab48-8c957e04cdf4','2020-05-14 14:33:27','2020-05-14 14:33:27','adrianb2104@gmail.com','A intrat in aplicatie'),('4cb58967-85f7-478a-bd9d-18bddb778240','2020-05-10 20:28:09','2020-05-10 20:28:09','adrianb2104@gmail.com','A intrat in aplicatie'),('4cee74fe-b148-4ab5-85ce-78c8a3dedef1','2020-05-10 18:45:12','2020-05-10 18:45:12','adrianb2104@gmail.com','A intrat in aplicatie'),('4d077db2-41b9-48ed-8396-fff9baff4b2e','2020-05-11 16:05:35','2020-05-11 16:05:35','adrianb2104@gmail.com','A intrat in aplicatie'),('4d67f092-847a-439c-b0e1-d63d8081920e','2020-05-10 18:38:21','2020-05-10 18:38:21','adrianb2104@gmail.com','A intrat in aplicatie'),('4fa093b6-a3d7-4a1e-a256-740298e294ec','2020-05-10 14:29:16','2020-05-10 14:29:16','adrianb2104@gmail.com','A intrat in aplicatie'),('508853f9-e743-4ff5-8041-3e808bde8e4d','2020-05-10 13:30:12','2020-05-10 13:30:12','adrianb2104@gmail.com','/reports/user-tracker'),('50b7f960-f3ee-4926-bed6-31146068ef87','2020-05-11 14:02:52','2020-05-11 14:02:52','adrianb2104@gmail.com','A intrat in aplicatie'),('510bb8b0-250f-49c3-8587-1cc976cd8767','2020-05-11 15:50:17','2020-05-11 15:50:17','adrianb2104@gmail.com','A intrat in aplicatie'),('562c76e4-0d62-46a5-ad70-d3348560c4e1','2020-05-13 16:01:07','2020-05-13 16:04:41','adrianb2104@gmail.com','/dashboards/dashboard-1'),('57c4bfaf-72ae-4460-8b8b-e1591aca5c8d','2020-05-10 18:18:31','2020-05-10 18:18:31','adrianb2104@gmail.com','A intrat in aplicatie'),('5c5a7bb9-ddc0-4d6f-96eb-a6224022c960','2020-05-13 16:24:49','2020-05-13 16:24:49','adrianb2104@yahoo.com','A intrat in aplicatie'),('61381b95-90aa-41b6-9475-e826d63c23b0','2020-05-11 15:10:08','2020-05-11 15:10:08','adrianb2104@gmail.com','A intrat in aplicatie'),('6b1bc688-82f9-48e7-85b2-bbe212aa3678','2020-05-13 23:18:06','2020-05-13 23:18:06','adrianb2104@gmail.com','A intrat in aplicatie'),('6c1d9db5-9416-445e-aa3b-4933896246b1','2020-05-14 14:20:47','2020-05-14 14:20:47','adrianb2104@gmail.com','A intrat in aplicatie'),('6dc9b235-c18d-4a90-818d-3dfa8b78c82e','2020-05-10 13:30:10','2020-05-10 13:30:12','adrianb2104@gmail.com','/farm/reg'),('6e3a7806-b326-4163-8a6e-d67c0c527cd9','2020-05-11 14:01:58','2020-05-11 14:01:58','adrianb2104@gmail.com','A intrat in aplicatie'),('6e7b127b-d414-47a5-9866-8771980effd4','2020-05-10 17:55:08','2020-05-10 17:55:08','adrianb2104@gmail.com','A intrat in aplicatie'),('6faaa324-45b1-4fac-8449-8028d60149f6','2020-05-10 17:43:24','2020-05-10 17:43:24','adrianb2104@gmail.com','A intrat in aplicatie'),('70d4803d-e990-4158-9df5-7dcfae17deff','2020-05-11 15:50:35','2020-05-11 15:50:35','adrianb2104@gmail.com','A intrat in aplicatie'),('757b68c9-f3ae-4e55-9b97-49b62d24aafb','2020-05-11 15:32:45','2020-05-11 15:32:45','adrianb2104@gmail.com','A intrat in aplicatie'),('7711b421-4511-47bc-a646-dbc1f39e3fb1','2020-05-10 13:30:09','2020-05-10 13:30:10','adrianb2104@gmail.com','/farm/reg'),('7aed7f42-1fab-45d2-b95a-6bf10625f938','2020-05-11 15:53:16','2020-05-11 15:53:16','adrianb2104@gmail.com','A intrat in aplicatie'),('7c8e9954-d472-41ba-8af0-7ff7e9443eb4','2020-05-11 15:56:13','2020-05-11 15:56:13','adrianb2104@gmail.com','A intrat in aplicatie'),('7dcbd2e8-7851-4151-ba83-8aa075474b30','2020-05-11 15:13:49','2020-05-11 15:13:49','adrianb2104@gmail.com','A intrat in aplicatie'),('7ed9f08f-0f2e-44fc-921b-0a97eb3ab02c','2020-05-10 20:54:04','2020-05-10 20:54:04','adrianb2104@gmail.com','A intrat in aplicatie'),('8008b79a-4e2e-4c10-ba5a-d064753efb9d','2020-05-11 15:59:29','2020-05-11 15:59:29','adrianb2104@gmail.com','A intrat in aplicatie'),('82165049-da84-4dc4-abd2-5ba3f06a9cfb','2020-05-10 20:52:35','2020-05-10 20:52:35','adrianb2104@gmail.com','A intrat in aplicatie'),('85340946-c22e-47fc-9348-de520e2a81fa','2020-05-11 13:52:52','2020-05-11 13:52:52','adrianb2104@gmail.com','A intrat in aplicatie'),('859cb03c-de7e-47ed-ade6-95e939601d31','2020-05-11 14:07:16','2020-05-11 14:07:16','adrianb2104@gmail.com','A intrat in aplicatie'),('8672510a-ffda-49f1-afc2-4889b20d1fa0','2020-05-10 13:30:15','2020-05-10 13:30:16','adrianb2104@gmail.com','/farm/tratamente'),('870f3d27-25b5-4deb-afa4-5ac5e4e97ea3','2020-05-11 12:19:37','2020-05-11 12:19:37','adrianb2104@gmail.com','A intrat in aplicatie'),('88aa1c8c-c210-45a1-8302-bf04e4d32bf0','2020-05-11 14:04:00','2020-05-11 14:04:00','adrianb2104@gmail.com','A intrat in aplicatie'),('892c63f6-8185-494a-8f23-fa5c1eccf2fa','2020-05-10 14:42:03','2020-05-10 14:42:03','adrianb2104@gmail.com','A intrat in aplicatie'),('8a0ca753-81bd-4174-8462-1f1e3d620a14','2020-05-14 14:23:22','2020-05-14 14:23:22','adrianb2104@gmail.com','A intrat in aplicatie'),('8bf84111-533d-47b3-8d04-118bb97429d7','2020-05-14 12:45:37','2020-05-14 12:45:37','adrianb2104@gmail.com','A intrat in aplicatie'),('8c8957a8-5143-4a62-98da-f54eb191d7ec','2020-05-10 18:53:57','2020-05-10 18:53:57','adrianb2104@gmail.com','A intrat in aplicatie'),('90d09cb3-647f-492b-a5d3-7c8ffe80d6ab','2020-05-11 13:07:37','2020-05-11 13:07:37','adrianb2104@gmail.com','A intrat in aplicatie'),('93a4ffff-6426-45fe-bcb5-27ea100bf414','2020-05-10 20:55:28','2020-05-10 20:55:28','adrianb2104@gmail.com','A intrat in aplicatie'),('93bdcaa1-4662-4a40-9ea9-b25702007d1c','2020-05-10 13:30:12','2020-05-10 13:30:13','adrianb2104@gmail.com','/reports/activities'),('94786845-af35-4e8e-a952-24c5e4a37fbe','2020-05-14 14:32:47','2020-05-14 14:32:47','adrianb2104@gmail.com','A intrat in aplicatie'),('95533da4-71c5-431b-9b4a-518d36578bca','2020-05-11 16:34:52','2020-05-11 16:34:52','adrianb2104@gmail.com','A intrat in aplicatie'),('99e03c59-d434-467c-931f-f2cba2d9c36b','2020-05-13 16:09:20','2020-05-13 16:09:20','adrianb2104@gmail.com','A intrat in aplicatie'),('9c21de26-a622-4b66-a6e1-69fbbc0f5b2f','2020-05-14 12:15:36','2020-05-14 12:15:36','adrianb2104@gmail.com','A intrat in aplicatie'),('9c84eb5e-4c29-452b-9142-ac7a857286d5','2020-05-10 18:56:38','2020-05-10 18:56:38','adrianb2104@gmail.com','A intrat in aplicatie'),('9f8ef0ea-8c21-43a5-a6de-026bdd492b5b','2020-05-11 15:32:30','2020-05-11 15:32:30','adrianb2104@gmail.com','A intrat in aplicatie'),('9ffc312c-33b8-433a-8261-093da289ced5','2020-05-13 16:49:14','2020-05-13 16:49:14','adrianb2104@yahoo.com','A intrat in aplicatie'),('a1d448d7-562b-413b-8999-00fef776e284','2020-05-11 14:47:59','2020-05-11 14:47:59','adrianb2104@gmail.com','A intrat in aplicatie'),('a2299d8c-40a9-46c7-a7cf-7bf49d467351','2020-05-11 12:15:53','2020-05-11 12:15:53','adrianb2104@gmail.com','A intrat in aplicatie'),('a4318368-c82c-43a6-bb24-a5393b27dca5','2020-05-10 13:58:09','2020-05-10 13:58:09','adrianb2104@gmail.com','A intrat in aplicatie'),('a4ac7dbf-1043-48a9-91cd-8121edcf2b4f','2020-05-10 21:00:41','2020-05-10 21:00:41','adrianb2104@gmail.com','A intrat in aplicatie'),('a6df932f-a608-4774-a1a0-54d6599d652f','2020-05-10 13:30:13','2020-05-10 13:30:13','adrianb2104@gmail.com','/reports/user-tracker'),('a92c4bb0-31d9-42ff-b6b2-d8c414b9c068','2020-05-10 13:30:15','2020-05-10 13:30:15','adrianb2104@gmail.com','/farm/tratamentegrup'),('a9428bc4-f5f4-4c54-8992-6e499106c3d1','2020-05-10 13:30:18','2020-05-10 13:30:20','adrianb2104@gmail.com','/farm/utilaj'),('acb243de-f827-4cc0-b5e3-abcd76fb5842','2020-05-14 14:18:12','2020-05-14 14:18:12','adrianb2104@gmail.com','A intrat in aplicatie'),('ae08a300-1338-4da4-b25e-349cf17479f1','2020-05-10 17:58:01','2020-05-10 17:58:01','adrianb2104@gmail.com','A intrat in aplicatie'),('ae46d6b8-b228-4ca8-816e-b4f722d8e22e','2020-05-14 14:17:36','2020-05-14 14:17:36','adrianb2104@gmail.com','A intrat in aplicatie'),('b07f496f-66d9-41f8-8bb3-124466f725ae','2020-05-11 16:53:48','2020-05-11 16:53:48','adrianb2104@gmail.com','A intrat in aplicatie'),('b32d2428-4433-4855-ab17-6b921d9c3560','2020-05-10 18:42:08','2020-05-10 18:42:12','adrianb2104@gmail.com','/dashboards/dashboard-1'),('b541844a-cab6-480b-a263-e93909f992fc','2020-05-11 15:03:02','2020-05-11 15:03:02','adrianb2104@gmail.com','A intrat in aplicatie'),('b5c288d5-90fa-4107-b9fc-3ac0eae20096','2020-05-14 12:45:35','2020-05-14 12:45:38','adrianb2104@gmail.com','/dashboards/dashboard-1'),('b81b8b2b-47c6-450f-9afd-e61cd156b1b7','2020-05-10 14:36:56','2020-05-10 14:36:56','adrianb2104@gmail.com','A intrat in aplicatie'),('b88099cf-3187-4682-a578-03a31335875e','2020-05-11 16:52:07','2020-05-11 16:52:07','adrianb2104@gmail.com','A intrat in aplicatie'),('b961d708-e202-4685-9bdd-a8d882b8e91c','2020-05-10 13:29:47','2020-05-10 13:29:47','adrianb2104@gmail.com','A intrat in aplicatie'),('b98d6662-9b80-4922-9cb4-8ba3956c802f','2020-05-11 13:53:14','2020-05-11 13:53:14','adrianb2104@gmail.com','A intrat in aplicatie'),('bbbc675c-6615-4545-95ee-1b3b17b69378','2020-05-10 13:30:06','2020-05-10 13:30:08','adrianb2104@gmail.com','/reports/activities'),('c11f4b90-e99b-468d-8794-419b3b87868c','2020-05-10 13:30:10','2020-05-10 13:30:10','adrianb2104@gmail.com','/farm/tratamente'),('c2bdbbe0-7ce6-4a55-91bc-49a2934d3316','2020-05-10 20:56:11','2020-05-10 20:56:11','adrianb2104@gmail.com','A intrat in aplicatie'),('c4b638c6-1fe6-42b8-ba31-f38db48b68d1','2020-05-11 15:07:07','2020-05-11 15:07:07','adrianb2104@gmail.com','A intrat in aplicatie'),('c4f92702-ce02-4e47-a1d5-2a08e0825f93','2020-05-10 13:30:17','2020-05-10 13:30:17','adrianb2104@gmail.com','/farm/buget'),('c57d06e7-2c3c-47d3-ab95-bf87d204b29e','2020-05-14 14:31:55','2020-05-14 14:31:55','adrianb2104@gmail.com','A intrat in aplicatie'),('c6139327-8d9a-4534-bb60-24c98449c464','2020-05-10 18:46:42','2020-05-10 18:46:42','adrianb2104@gmail.com','A intrat in aplicatie'),('c69e3dd2-e7a2-43e7-bdc0-5788dc5f9f69','2020-05-10 13:30:13','2020-05-10 13:30:15','adrianb2104@gmail.com','/reports/animal-groups'),('c6a7997e-cd4f-412f-ba0c-e090806f2eed','2020-05-11 11:35:14','2020-05-11 11:35:14','adrianb2104@gmail.com','A intrat in aplicatie'),('cc9d1caa-8a88-4e69-a056-b6ef52f1abe5','2020-05-11 15:36:12','2020-05-11 15:36:12','adrianb2104@gmail.com','A intrat in aplicatie'),('ce021b17-6088-4bf8-9407-73c8f47455b1','2020-05-10 18:42:08','2020-05-10 18:42:08','adrianb2104@gmail.com','A intrat in aplicatie'),('d0601a9b-4c07-42f7-a446-cbef53f53219','2020-05-10 21:06:27','2020-05-10 21:06:27','adrianb2104@gmail.com','A intrat in aplicatie'),('d336efc7-45fd-43f4-84c8-fd718447bcce','2020-05-11 15:12:47','2020-05-11 15:12:47','adrianb2104@gmail.com','A intrat in aplicatie'),('dc34bdce-62bc-4b8e-973c-29d494325af2','2020-05-10 20:32:23','2020-05-10 20:32:23','adrianb2104@gmail.com','A intrat in aplicatie'),('dd183a16-caf5-4528-ae20-8643805785ec','2020-05-10 18:44:34','2020-05-10 18:44:34','adrianb2104@gmail.com','A intrat in aplicatie'),('de7b8c8b-3e84-40f2-a2ab-d788ccd2c8fc','2020-05-10 18:48:27','2020-05-10 18:48:27','adrianb2104@gmail.com','A intrat in aplicatie'),('dfe9b962-55a3-4922-9458-57c940db0bac','2020-05-10 19:58:22','2020-05-10 19:58:22','adrianb2104@gmail.com','A intrat in aplicatie'),('e002f744-9172-4b96-93b1-a1afc3d210df','2020-05-11 16:57:05','2020-05-11 16:57:05','adrianb2104@gmail.com','A intrat in aplicatie'),('e00a8052-cc72-40fb-8712-195615858a06','2020-05-11 14:55:48','2020-05-11 14:55:48','adrianb2104@gmail.com','A intrat in aplicatie'),('e173aa21-2944-4e84-bc63-b6761ee0be90','2020-05-11 14:54:34','2020-05-11 14:54:34','adrianb2104@gmail.com','A intrat in aplicatie'),('e97ea37e-3154-4bfe-a922-2c7c175ae28c','2020-05-11 16:16:55','2020-05-11 16:16:55','adrianb2104@gmail.com','A intrat in aplicatie'),('eab7f37e-8ac6-4c58-8be5-98f05177cb9d','2020-05-13 16:20:06','2020-05-13 16:20:14','adrianb2104@gmail.com','/reports/user-tracker'),('ec637083-8de6-467b-8570-b53473e48a63','2020-05-11 16:21:35','2020-05-11 16:21:35','adrianb2104@gmail.com','A intrat in aplicatie'),('ecf8188b-d65d-441d-bff6-f02feba942ab','2020-05-10 13:30:18','2020-05-10 13:30:18','adrianb2104@gmail.com','/farm/inventar'),('ed0c3f68-b4a9-4447-84f3-0a7f0651c08f','2020-05-13 16:20:14','2020-05-13 16:20:15','adrianb2104@gmail.com','/reports/activities'),('effddd8b-4e96-46c3-9633-cb312247249b','2020-05-11 16:32:09','2020-05-11 16:32:09','adrianb2104@gmail.com','A intrat in aplicatie'),('f04ca74f-94a4-40fc-ac9d-db082933df75','2020-05-14 12:46:25','2020-05-14 12:46:25','adrianb2104@gmail.com','A intrat in aplicatie'),('f06a8708-e2b1-4819-be55-a4d9c6d07171','2020-05-13 16:10:06','2020-05-13 16:10:06','adrianb2104@gmail.com','A intrat in aplicatie'),('f0ae6d56-5fd7-46bb-90de-2c1d3a9b44be','2020-05-11 15:55:14','2020-05-11 15:55:14','adrianb2104@gmail.com','A intrat in aplicatie'),('f1148f3e-9ba4-4fbe-8741-7ca955c787e1','2020-05-11 15:13:30','2020-05-11 15:13:30','adrianb2104@gmail.com','A intrat in aplicatie'),('f1489aec-e5ce-46b9-9058-80f3db216100','2020-05-10 13:30:17','2020-05-10 13:30:18','adrianb2104@gmail.com','/farm/bunuri'),('fddddc92-a2bd-4eab-bdc3-57e5c9866864','2020-05-10 14:25:56','2020-05-10 14:25:56','adrianb2104@gmail.com','A intrat in aplicatie'),('fe5c66bd-d2f1-449f-9b91-5ee08d43dff2','2020-05-10 19:57:28','2020-05-10 19:57:28','adrianb2104@gmail.com','A intrat in aplicatie'),('fe9a56cb-9a4b-48f8-b5db-b670347b90dd','2020-05-13 16:08:24','2020-05-13 16:08:24','adrianb2104@gmail.com','A intrat in aplicatie'),('ffa62698-6fd3-4fe6-ad02-b763897d56b8','2020-05-13 16:20:06','2020-05-13 16:20:06','adrianb2104@gmail.com','A intrat in aplicatie');
/*!40000 ALTER TABLE `logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lot`
--

DROP TABLE IF EXISTS `lot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lot` (
  `id` varchar(50) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `location` varchar(128) DEFAULT NULL,
  `area` int DEFAULT NULL,
  `cadastreTerrain` varchar(50) DEFAULT NULL,
  `agricolId` varchar(50) DEFAULT NULL,
  `soilType` varchar(50) DEFAULT NULL,
  `ownerType` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lot`
--

LOCK TABLES `lot` WRITE;
/*!40000 ALTER TABLE `lot` DISABLE KEYS */;
INSERT INTO `lot` VALUES ('0235e6dc-6cb1-828a-a58c-525a670b4684','e3','ew',4,'ewq','e','A','A');
/*!40000 ALTER TABLE `lot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `meetings`
--

DROP TABLE IF EXISTS `meetings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `meetings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` text NOT NULL,
  `name` text NOT NULL,
  `value` text NOT NULL,
  `backgroundColor` text NOT NULL,
  `start` datetime NOT NULL,
  `due_date` datetime NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meetings`
--

LOCK TABLES `meetings` WRITE;
/*!40000 ALTER TABLE `meetings` DISABLE KEYS */;
/*!40000 ALTER TABLE `meetings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `model`
--

DROP TABLE IF EXISTS `model`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `model` (
  `id` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `model`
--

LOCK TABLES `model` WRITE;
/*!40000 ALTER TABLE `model` DISABLE KEYS */;
/*!40000 ALTER TABLE `model` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modules`
--

DROP TABLE IF EXISTS `modules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modules` (
  `code` varchar(255) NOT NULL,
  `denumire` varchar(255) NOT NULL,
  `id` varchar(36) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modules`
--

LOCK TABLES `modules` WRITE;
/*!40000 ALTER TABLE `modules` DISABLE KEYS */;
/*!40000 ALTER TABLE `modules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `partners_entity`
--

DROP TABLE IF EXISTS `partners_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `partners_entity` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` text NOT NULL,
  `last_name` text NOT NULL,
  `email` text NOT NULL,
  `phone` text NOT NULL,
  `address` text NOT NULL,
  `description` text NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partners_entity`
--

LOCK TABLES `partners_entity` WRITE;
/*!40000 ALTER TABLE `partners_entity` DISABLE KEYS */;
/*!40000 ALTER TABLE `partners_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pasunat`
--

DROP TABLE IF EXISTS `pasunat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pasunat` (
  `id` varchar(50) NOT NULL,
  `yearValue` varchar(20) DEFAULT NULL,
  `ianValue` varchar(20) DEFAULT NULL,
  `febValue` varchar(20) DEFAULT NULL,
  `marValue` varchar(20) DEFAULT NULL,
  `aprValue` varchar(20) DEFAULT NULL,
  `maiValue` varchar(20) DEFAULT NULL,
  `iunValue` varchar(20) DEFAULT NULL,
  `iulValue` varchar(20) DEFAULT NULL,
  `augValue` varchar(20) DEFAULT NULL,
  `sepValue` varchar(20) DEFAULT NULL,
  `octValue` varchar(20) DEFAULT NULL,
  `novValue` varchar(20) DEFAULT NULL,
  `decValue` varchar(20) DEFAULT NULL,
  `creationDate` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pasunat`
--

LOCK TABLES `pasunat` WRITE;
/*!40000 ALTER TABLE `pasunat` DISABLE KEYS */;
INSERT INTO `pasunat` VALUES ('1c2b8053-b367-c90e-a2ae-46d8204f496d','2039','11','13','24','13','22','22','20','12','19','12','22','22','2020-02-25 16:13:45.967000'),('2629371c-18fb-9d4a-4beb-42a66f0cbf15',NULL,'0','0','0','13','31','30','31','31','30','31','30','0','2020-02-17 11:24:41.240000'),('2e40d788-817f-fce4-bca5-5ea9cb1d32bc','2039','11','13','24','13','22','22','20','12','19','12','22','22','2020-02-25 16:13:42.807000'),('5d229da6-9e1d-a3e1-36b0-8aa8f2de3626','2032',NULL,NULL,NULL,'7','8','10','5',NULL,NULL,NULL,NULL,NULL,'2020-02-17 11:26:07.523000'),('654c843e-8243-6ec2-0c79-5e3b94042bdd',NULL,'7','12','14','15','22','1','8','30','16','12','10','31','2020-03-11 09:56:14.403000'),('8ca30b4a-9802-e580-0032-e25503b45445','2034','12','12','12','10','9','8','9','12','11','13','12','13','2020-02-17 10:27:45.170000');
/*!40000 ALTER TABLE `pasunat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `name` varchar(100) NOT NULL,
  `title` varchar(255) NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profiles`
--

DROP TABLE IF EXISTS `profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profiles` (
  `id` varchar(50) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `bio` varchar(128) DEFAULT NULL,
  `image` int DEFAULT NULL,
  `following` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profiles`
--

LOCK TABLES `profiles` WRITE;
/*!40000 ALTER TABLE `profiles` DISABLE KEYS */;
/*!40000 ALTER TABLE `profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `receptie`
--

DROP TABLE IF EXISTS `receptie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `receptie` (
  `id` int NOT NULL AUTO_INCREMENT,
  `number` text NOT NULL,
  `date` datetime NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receptie`
--

LOCK TABLES `receptie` WRITE;
/*!40000 ALTER TABLE `receptie` DISABLE KEYS */;
/*!40000 ALTER TABLE `receptie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reg`
--

DROP TABLE IF EXISTS `reg`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reg` (
  `gestating` tinyint DEFAULT NULL,
  `weight` int DEFAULT NULL,
  `grpId` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `species` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `breed` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sex` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `creationDate` datetime DEFAULT NULL,
  `crotaliuId` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dateOfBirth` datetime DEFAULT NULL,
  `meatOrMilk` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `parentMId` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `parentFId` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `exitDate` datetime DEFAULT NULL,
  `stage` int DEFAULT NULL,
  `age` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reg`
--

LOCK TABLES `reg` WRITE;
/*!40000 ALTER TABLE `reg` DISABLE KEYS */;
INSERT INTO `reg` VALUES (NULL,NULL,'Bovine-Beefalo-M','Bovine','Beefalo','M','2020-04-02 03:00:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'175508bd-2c9c-4397-8af5-67fd1c7a8d99'),(NULL,NULL,'Bovine-Beefalo-M','Bovine','Beefalo','M','2020-04-02 03:00:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'35b47346-f405-4abd-8ab4-9321da7ff77d'),(NULL,NULL,'Ovine-Dorset-F','Ovine','Dorset','F','2020-04-28 03:00:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'3e3f0d70-9c6e-44c3-b765-130251bdf11d'),(NULL,NULL,'Ovine-Dorset-F','Ovine','Dorset','F','2020-04-28 03:00:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'54faf663-49c5-47f3-a5c2-2046d004f55e'),(NULL,NULL,'Ovine-Dorset-F','Ovine','Dorset','F','2020-04-28 03:00:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'90a026f9-5fc2-4e77-b516-27a40ffcd062');
/*!40000 ALTER TABLE `reg` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `reg_view`
--

DROP TABLE IF EXISTS `reg_view`;
/*!50001 DROP VIEW IF EXISTS `reg_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `reg_view` AS SELECT 
 1 AS `grpId`,
 1 AS `total`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rolesxmodules`
--

DROP TABLE IF EXISTS `rolesxmodules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rolesxmodules` (
  `id` varchar(36) NOT NULL,
  `roleId` varchar(255) NOT NULL,
  `moduleId` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rolesxmodules`
--

LOCK TABLES `rolesxmodules` WRITE;
/*!40000 ALTER TABLE `rolesxmodules` DISABLE KEYS */;
/*!40000 ALTER TABLE `rolesxmodules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test`
--

DROP TABLE IF EXISTS `test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `test` (
  `id` varchar(50) NOT NULL,
  `name` varchar(128) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test`
--

LOCK TABLES `test` WRITE;
/*!40000 ALTER TABLE `test` DISABLE KEYS */;
/*!40000 ALTER TABLE `test` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tickets`
--

DROP TABLE IF EXISTS `tickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tickets` (
  `id` varchar(36) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `user` varchar(50) NOT NULL,
  `module` varchar(25) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tickets`
--

LOCK TABLES `tickets` WRITE;
/*!40000 ALTER TABLE `tickets` DISABLE KEYS */;
/*!40000 ALTER TABLE `tickets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `treatments`
--

DROP TABLE IF EXISTS `treatments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `treatments` (
  `gestating` tinyint DEFAULT NULL,
  `weight` int DEFAULT NULL,
  `grpAdm` tinyint DEFAULT NULL,
  `temp` int DEFAULT NULL,
  `qty` int DEFAULT NULL,
  `admType` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `treatmentDate` datetime DEFAULT NULL,
  `obs` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `age` int NOT NULL,
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `animalId` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `grpId` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `vetName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `treatment` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `measurementUnit` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `measurementUnit2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `treatments`
--

LOCK TABLES `treatments` WRITE;
/*!40000 ALTER TABLE `treatments` DISABLE KEYS */;
/*!40000 ALTER TABLE `treatments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `typeorm_metadata`
--

DROP TABLE IF EXISTS `typeorm_metadata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `typeorm_metadata` (
  `type` varchar(255) NOT NULL,
  `database` varchar(255) DEFAULT NULL,
  `schema` varchar(255) DEFAULT NULL,
  `table` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `value` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `typeorm_metadata`
--

LOCK TABLES `typeorm_metadata` WRITE;
/*!40000 ALTER TABLE `typeorm_metadata` DISABLE KEYS */;
INSERT INTO `typeorm_metadata` VALUES ('VIEW',NULL,'farm',NULL,'reg_view','SELECT grpId, COUNT(reg.id) AS total FROM farm.reg GROUP BY reg.grpId;'),('VIEW',NULL,'farm',NULL,'reg_view','SELECT grpId, COUNT(reg.id) AS total FROM farm.reg GROUP BY reg.grpId;'),('VIEW',NULL,'farm',NULL,'reg_view','SELECT grpId, COUNT(reg.id) AS total FROM farm.reg GROUP BY reg.grpId;');
/*!40000 ALTER TABLE `typeorm_metadata` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `isVerified` bit(1) NOT NULL,
  `password` text NOT NULL,
  `avatar` varchar(255) NOT NULL DEFAULT '',
  `modules` varchar(255) NOT NULL DEFAULT '',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'adrianb2104@gmail.com','adi','b',_binary '','$2a$10$TTS23yVIW0WgNY3XM5rRt.9dbZHWHrCNFC0syXyrkIxkuVJ/VQjIi','','','2020-03-29 21:59:48.853948'),(2,'adrianb2104@yahoo.com','Badulescu','Adrian',_binary '','$2a$10$czXUT/ioVZF2n7ojXoCGjO.Ny/p8V1FR2eCmStRAiInOaEfbgmk..','','','2020-05-13 16:22:38.443871'),(3,'adina.artene@yahoo.com','Badulescu','Adina',_binary '\0','$2a$10$y8fvZgkDaClPTJWvoH1awuTZ5oMn6GqKon7oGHEXIiV1AZjmrjHqO','','','2020-05-13 16:53:06.255171'),(4,'adinaartene5@gmail.com','Badulescu','Adina',_binary '\0','$2a$10$ZjWbF/SoQeB4FWV83bVL4OM2KWcxJ3szJhcnBTKNtJMR2visIZDpG','','','2020-05-13 16:54:16.261718');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_groups`
--

DROP TABLE IF EXISTS `user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_groups` (
  `group_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`group_id`,`user_id`),
  KEY `IDX_4c5f2c23c34f3921fbad2cd394` (`group_id`),
  KEY `IDX_95bf94c61795df25a515435010` (`user_id`),
  CONSTRAINT `FK_4c5f2c23c34f3921fbad2cd3940` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_95bf94c61795df25a5154350102` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_groups`
--

LOCK TABLES `user_groups` WRITE;
/*!40000 ALTER TABLE `user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `exit_animals`
--

/*!50001 DROP VIEW IF EXISTS `exit_animals`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `exit_animals` AS select `reg`.`gestating` AS `gestating`,`reg`.`weight` AS `weight`,`reg`.`grpId` AS `grpId`,`reg`.`species` AS `species`,`reg`.`breed` AS `breed`,`reg`.`sex` AS `sex`,`reg`.`creationDate` AS `creationDate`,`reg`.`crotaliuId` AS `crotaliuId`,`reg`.`dateOfBirth` AS `dateOfBirth`,`reg`.`meatOrMilk` AS `meatOrMilk`,`reg`.`parentMId` AS `parentMId`,`reg`.`parentFId` AS `parentFId`,`reg`.`exitDate` AS `exitDate`,`reg`.`stage` AS `stage`,`reg`.`age` AS `age`,`reg`.`id` AS `id` from `reg` where (`reg`.`exitDate` is not null) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `reg_view`
--

/*!50001 DROP VIEW IF EXISTS `reg_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `reg_view` AS select `reg`.`grpId` AS `grpId`,count(`reg`.`id`) AS `total` from `reg` group by `reg`.`grpId` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-14 14:37:13
