# Maven build envirionment
FROM maven:3.9.6 AS build
COPY src /usr/src/app/src
COPY pom.xml /usr/src/app
RUN mvn -f /usr/src/app/pom.xml clean package
COPY src/main/resources/iot.properties /usr/src/app/target/

# Java run
FROM openjdk:17-jdk
COPY --from=build /usr/src/app/target/iotclient-1.0.0.jar /usr/app/
COPY --from=build /usr/src/app/target/lib /usr/app/lib
COPY --from=build /usr/src/app/target/iot.properties /iot.properties
ENTRYPOINT ["java", "-jar", "/usr/app/iotclient-1.0.0.jar"]