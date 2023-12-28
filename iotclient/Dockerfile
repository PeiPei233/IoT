FROM openjdk:17-jdk
ADD target/*.jar iotclient.jar
ADD target/lib lib
ADD src/main/resources/iot.properties iot.properties
ENTRYPOINT ["java","-jar","/iotclient.jar"]