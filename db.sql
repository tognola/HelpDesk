-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: localhost    Database: helpdesk
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cliente`
--

/**** mods ******/
alter table usuario rename column sesion to email;
alter table usuario add column cliente_id int;
alter table usuario add foreign key (cliente_id) references cliente(id);
/**** *****/

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `cliente` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,'Hospital Pirovano'),(2,'Hospital Rivadavia'),(3,'Hospital Gutierrez'),(4,'Hospital Ramos Mejía'),(5,'Hospital Mercante'),(6,'Hospital Héroes de Malvinas'),(7,'Hospital Mariano Luciano de la Vega'),(8,'Hospital Maternidad de Moreno'),(9,'Hospital Bocalandro'),(10,'Hospital Melendez'),(11,'Hospital Muñiz'),(12,'Hospital Alejandro Korn'),(13,'Otro');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente_producto`
--

DROP TABLE IF EXISTS `cliente_producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `cliente_producto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cliente_id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `cliente_id` (`cliente_id`),
  KEY `producto_id` (`producto_id`),
  CONSTRAINT `cliente_producto_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `cliente` (`id`),
  CONSTRAINT `cliente_producto_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `producto` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente_producto`
--

LOCK TABLES `cliente_producto` WRITE;
/*!40000 ALTER TABLE `cliente_producto` DISABLE KEYS */;
INSERT INTO `cliente_producto` VALUES (1,1,1),(2,2,1),(3,3,1),(4,4,2),(5,5,2),(6,6,1),(7,7,2),(8,8,2),(9,9,2),(10,10,2),(11,11,2),(12,12,2),(13,13,2);
/*!40000 ALTER TABLE `cliente_producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `producto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (1,'Modulab Gold'),(2,'Modulab Win'),(3,'IBloodBank');
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tarea`
--

DROP TABLE IF EXISTS `tarea`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tarea` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ticket_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `inicio` timestamp NOT NULL,
  `fin` timestamp NULL DEFAULT NULL,
  `accion` varchar(100) DEFAULT NULL,
  `observacion` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ticket_id` (`ticket_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `tarea_ibfk_1` FOREIGN KEY (`ticket_id`) REFERENCES `ticket` (`id`),
  CONSTRAINT `tarea_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tarea`
--

LOCK TABLES `tarea` WRITE;
/*!40000 ALTER TABLE `tarea` DISABLE KEYS */;
INSERT INTO `tarea` VALUES (1,17,1,'2019-10-17 14:00:36',NULL,NULL,'as'),(2,17,1,'2019-10-17 14:29:35',NULL,'otra accion','12'),(3,17,1,'2019-10-17 14:37:56',NULL,'otra accion',''),(4,16,1,'2019-10-17 17:11:18','2019-10-21 14:51:51','solucionandolo...',''),(5,17,1,'2019-10-21 14:53:51','2019-10-21 14:54:05','bla bla...','solo de prueba'),(6,15,1,'2019-10-21 14:55:01','2019-10-21 14:55:22','otra accion',''),(7,14,1,'2019-10-21 14:55:53','2019-10-21 15:29:45','',''),(8,24,1,'2019-10-21 15:30:22','2019-10-21 15:30:35','instalo modulab',''),(9,24,1,'2019-10-21 19:54:16','2019-10-21 19:54:28','solucionandolo...',''),(10,23,1,'2019-10-21 22:31:30','2019-10-21 22:31:45','hice tal cosa',''),(11,23,1,'2019-10-21 22:31:54','2019-10-21 22:32:16','se termino',''),(12,25,1,'2019-10-22 19:08:37',NULL,'','');
/*!40000 ALTER TABLE `tarea` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket`
--

DROP TABLE IF EXISTS `ticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `ticket` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int(11) NOT NULL,
  `cliente_id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `titulo` varchar(300) NOT NULL,
  `comentario` varchar(1000) DEFAULT NULL,
  `inicio` timestamp NULL DEFAULT NULL,
  `fin` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `cliente_id` (`cliente_id`),
  KEY `producto_id` (`producto_id`),
  CONSTRAINT `ticket_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `usuario` (`id`),
  CONSTRAINT `ticket_ibfk_2` FOREIGN KEY (`cliente_id`) REFERENCES `cliente` (`id`),
  CONSTRAINT `ticket_ibfk_3` FOREIGN KEY (`producto_id`) REFERENCES `producto` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket`
--

LOCK TABLES `ticket` WRITE;
/*!40000 ALTER TABLE `ticket` DISABLE KEYS */;
INSERT INTO `ticket` VALUES (1,'2019-08-28 18:41:21',1,1,1,'Primer ticket','probando comentario...','2019-10-17 13:40:06','2019-10-17 13:41:57'),(2,'2019-08-28 18:43:21',1,1,1,'Primer ticket','probando comentario...','2019-10-17 13:42:44',NULL),(3,'2019-08-28 18:55:03',1,4,1,'Otro ticket','215','2019-10-17 13:42:44',NULL),(4,'2019-08-28 18:55:31',1,1,1,'cargando otro ticket','de onda','2019-10-17 13:47:12',NULL),(13,'2019-10-16 18:22:16',1,2,1,'ticket de prueba','cargando otro...',NULL,NULL),(14,'2019-10-16 18:26:29',1,3,1,'nuevo ticket','','2019-10-21 14:55:53',NULL),(15,'2019-10-16 18:27:42',1,7,2,'Ticket 2','asdsad ','2019-10-21 14:55:01','2019-10-21 14:55:22'),(16,'2019-10-17 11:59:03',1,1,1,'cargando otro ticket','','2019-10-17 17:11:18','2019-10-21 14:51:51'),(17,'2019-10-17 11:59:38',1,3,1,'asdasd','ew','2019-10-17 14:00:36','2019-10-21 14:54:05'),(18,'2019-10-21 15:13:03',1,3,1,'Instalar modulab','',NULL,NULL),(19,'2019-10-21 15:14:48',1,3,1,'cargando otro ticket','',NULL,NULL),(20,'2019-10-21 15:15:28',1,3,1,'cargando otro ticket','',NULL,NULL),(21,'2019-10-21 15:16:17',1,3,1,'Bioingeniero','',NULL,NULL),(22,'2019-10-21 15:23:31',1,3,1,'','',NULL,NULL),(23,'2019-10-21 15:25:07',1,2,1,'as','','2019-10-21 22:31:30','2019-10-21 22:32:16'),(24,'2019-10-21 15:27:46',1,3,1,'Instalar modulab en labo 16','Hola denise! probando sistema de tickets','2019-10-21 15:30:22','2019-10-21 15:30:35'),(25,'2019-10-22 18:54:09',1,2,1,'Mostrar PCR con dos decimales','','2019-10-22 19:08:37',NULL);
/*!40000 ALTER TABLE `ticket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) NOT NULL,
  `apellido` varchar(20) NOT NULL,
  `user` varchar(10) NOT NULL,
  `pass` varchar(15) NOT NULL,
  `permiso` int(11) DEFAULT NULL,
  `sesion` varchar(250) DEFAULT NULL,
  `estado` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (2,'Hopital','Pirovano','pirovano','123',2,'a9a2edafae30e0da4602384574b5364d','2', 1);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `viaje`
--

DROP TABLE IF EXISTS `viaje`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `viaje` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `cliente_id` int(11) DEFAULT NULL,
  `producto_id` int(11) DEFAULT NULL,
  `ticket_id` int(11) DEFAULT NULL,
  `comentario` varchar(200) DEFAULT NULL,
  `inicio` timestamp NULL DEFAULT NULL,
  `fin` timestamp NULL DEFAULT NULL,
  `km_inicio` int(11) DEFAULT NULL,
  `km_fin` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cliente_id` (`cliente_id`),
  KEY `producto_id` (`producto_id`),
  KEY `ticket_id` (`ticket_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `viaje_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `cliente` (`id`),
  CONSTRAINT `viaje_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `producto` (`id`),
  CONSTRAINT `viaje_ibfk_3` FOREIGN KEY (`ticket_id`) REFERENCES `ticket` (`id`),
  CONSTRAINT `viaje_ibfk_4` FOREIGN KEY (`user_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `viaje`
--

LOCK TABLES `viaje` WRITE;
/*!40000 ALTER TABLE `viaje` DISABLE KEYS */;
INSERT INTO `viaje` VALUES (1,NULL,NULL,NULL,NULL,NULL,'2019-09-17 18:25:02',NULL,NULL,NULL),(2,1,1,1,1,'probando....','2019-09-17 18:26:38','2019-10-16 15:17:17',NULL,NULL),(3,1,1,1,1,'probando....','2019-09-18 19:06:03',NULL,NULL,NULL),(4,1,1,1,NULL,'das','2019-09-18 19:16:50',NULL,NULL,NULL),(5,1,1,1,NULL,'probando....','2019-09-19 14:16:15','2019-10-16 15:54:17',NULL,NULL),(6,1,10,2,NULL,'','2019-10-16 16:00:41','2019-10-16 16:03:10',NULL,NULL),(7,1,11,2,NULL,'','2019-10-16 16:03:56','2019-10-16 16:06:24',NULL,NULL),(8,1,11,2,NULL,'','2019-10-16 16:39:09','2019-10-16 16:41:13',NULL,NULL),(9,1,2,1,NULL,'','2019-10-16 16:41:19','2019-10-16 16:42:13',NULL,NULL),(10,1,2,1,NULL,'','2019-10-16 16:42:44','2019-10-16 16:42:56',NULL,NULL),(11,1,2,1,NULL,'','2019-10-16 17:09:11','2019-10-16 17:09:53',NULL,NULL),(12,1,12,2,NULL,'','2019-10-17 11:48:39','2019-10-17 12:53:51',NULL,NULL),(13,1,10,2,NULL,'','2019-10-21 18:56:59',NULL,500,NULL),(14,1,11,2,NULL,'','2019-10-21 19:02:25',NULL,233,NULL),(15,1,4,2,NULL,'','2019-10-21 19:02:59','2019-10-21 19:12:10',500,1000),(16,1,11,2,NULL,'awewqe','2019-10-21 19:14:32','2019-10-21 19:14:46',500,8900),(17,1,3,1,NULL,'','2019-10-21 19:53:42','2019-10-21 19:54:05',8900,10000);
/*!40000 ALTER TABLE `viaje` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-10-28 13:23:52
