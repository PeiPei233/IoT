#import "report-template.typ": *

#show: project.with(
  verbose: false,
  title: "使用手册",
  before-title: "第二部分"
)

= 安装运行指南

== 安装前后端服务

=== 使用 Docker 安装

在项目根目录（即包含 `docker-compose.yml` 文件的目录）执行以下命令：

```bash
    docker-compose up
```

即可启动项目。

=== 使用源码安装

1. 需要安装以下软件：

- #link("https://nodejs.org/")[Node.js]
- #link("https://www.oracle.com/java/technologies/downloads/")[JDK 17/20]
- #link("https://www.mysql.com/downloads/")[MySQL]
- #link("https://mosquitto.org/download/")[MQTT]

2. 执行以下命令安装前端资源：

```sh
    cd frontEnd
    npm install
    npm run build
```

3. 运行 MySQL 数据库和 MQTT 服务器，并在 MySQL 中执行 `backEnd/src/main/resources/schema.sql` 文件中的 SQL 语句，创建数据库。如有需要，请在 `backEnd/src/main/resources/application.properties` 文件中修改数据库连接信息：

```properties
      spring.datasource.url=jdbc:mysql://<your-host>:<your-port>/iot
```

4. 执行以下命令启动后端服务：

```sh
      cd backEnd
      ./mvnw spring-boot:run
```

5. 打开浏览器，访问 `http://localhost:8080` 即可使用。

== 模拟 Client 虚拟信息发送

在根目录下执行以下命令：

```sh
    cd iotclient
    mvn clean install
    cd target
    java -jar iotclient-1.0.0.jar
```

即可启动 Client 模拟器，模拟发送虚拟信息。

= 功能介绍

== 用户信息管理

- 用户可以注册账号，登录系统。
- 用户可以修改自己的用户信息，包括用户名、密码、邮箱等。

== 设备信息管理

- 用户可以添加设备或修改已有设备的信息，包括设备名称、设备类型、设备描述等。也可以删除设备。
- 用户可以查看设备列表，也可以对设备列表进行搜索。可以查看某个设备上报的详细数据。
- 设备可以通过 MQTT 协议上报数据。

== 统计展示信息

- 用户可以查看设备上报的数据，通过图表的形式直观地展示数据。
- 用户可以查看设备上报的数据，并查看设备的状态和历史轨迹。

= 操作手册


