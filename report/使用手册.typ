#import "report-template.typ": *

#show: project.with(
  verbose: false,
  title: "使用手册",
  before-title: "第二部分"
)

#let inline-button(
  icon: "",
  bg-color: rgb(22,119,255), 
  fg-color: white,
  stroke: none,
  content
) = {
  if icon == "" {
    box(fill: bg-color,
      stroke: stroke,
      radius: 3pt, 
      inset: (x: 5pt, y: 1pt),
      outset: (y: 3pt),
      text(font: hei,
        fill: fg-color,
        size: 8.5pt,
        content
      )
    )
  } else {
    box(fill: bg-color,
      stroke: stroke,
      radius: 3pt, 
      inset: (x: 5pt, y: 0pt),
      outset: (y: 3pt),
    )[#box(image(icon, height: 6.7pt)) 
      #text(font: hei,
        fill: fg-color,
        size: 8.5pt,
        content
      )]
  }
}

#let inline-menu(
  icon: "",
  content
) = {
  inline-button(
    icon: icon,
    bg-color: rgb(245,245,245),
    fg-color: black,
    content
  )
}

#let inline-link(content) = {
  text(font: hei,
    fill: rgb(100,108,255),
    size: 10.5pt,
    content
  )
}

= 安装运行指南

== 使用 Docker 安装

在项目根目录（即包含 `docker-compose.yml` 文件的目录）执行以下命令即可启动项目：

```bash
    docker load -i iot.tar
    docker-compose up
```

上述方式启动的并未包括模拟终端。如需一同启动模拟终端，请执行以下命令：

```bash
    docker load -i iot.tar
    docker-compose -f docker-compose-with-client.yml up
```

== 使用源码安装

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

4. 执行以下命令安装并启动后端服务：

```sh
      cd backEnd
      ./mvnw spring-boot:run
```

5. 打开浏览器，访问 `http://localhost:8080` 即可使用。

6. 如需使用模拟Client，需在根目录下执行以下命令，启动 Client 模拟器，模拟发送虚拟信息：

```sh
      cd iotclient
      mvn clean install
      cd target
      java -jar iotclient-1.0.0.jar
```

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
- 用户可以查看设备的状态和历史轨迹。

= 操作手册

== 用户注册与登录

用户可以通过注册账号的方式注册一个新的账号，也可以通过已有账号登录系统。

=== 注册账号

进入网站根目录，默认是登陆界面。点击 #inline-button("Log in") 按钮下方的 #inline-link("register now!") 链接，进入以下注册界面：

#figure(
  image("assets/manual/register.png", width: 29%)
)

在注册界面，输入用户名、密码、邮箱，其中密码不得少于6位，且需要输入两次。点击 #inline-button("Register") 按钮即可注册成功，网站会自动跳转回登录界面。

=== 登录账号

在登录界面，输入用户名和密码，点击 #inline-button("Log in") 按钮即可登录成功，网站会自动跳转到消息统计界面 `/dashboard`。

#figure(
  image("assets/manual/login.png", width: 29%)
)

== 消息统计展示

在登录成功后，会自动跳转到消息统计界面 `/dashboard`。在该界面，可以查看设备上报的数据，通过图表的形式直观地展示数据。页面最上方是导航栏，可以通过导航栏的链接跳转到其他页面。页面中间是卡片，展示了设备的统计信息。页面最下方是地图，展示了设备的位置信息。

#figure(
  image("assets/manual/dashboard.png", width: 80%)
)

在页面最上方的是导航栏，点击导航栏中的  #inline-menu(icon: "assets/manual/react.svg")[] 菜单选项，也可以跳转到消息统计界面 `/dashboard`。

在页面中间的是展示统计信息的卡片。其中，第一行展示卡片展示的分别是活跃的、总的设备数量，总消息数及其不同类别消息的占比、今日消息数以及最近7日的消息数曲线。第二行卡片展示的是最新的消息列表以及发送消息最多的设备列表。第三行卡片展示的是所有设备最新的位置以及状态。


而页面右下角有两个图标，分别是查看帮助和回到页面顶部。点击页面右下角的 #inline-menu(icon: "assets/manual/file-text.svg")[] 按钮，可以显示设备如何发送消息的说明：

#figure(
  image("assets/manual/devices-help.png", width: 70%)
)



对于图标和地图，将鼠标浮动到其之上，会显示图标的详细信息，例如对于7日消息数曲线图，会显示每天的消息数：

#figure(
  image("assets/manual/dashboard-hover.png", width: 50%)
)

将鼠标移动到地图上的设备标记上，会显示该设备的详细信息：

#figure(
  image("assets/manual/dashboard-map-hover.png", width: 60%)
)

对于新创建的还未添加设备或消息的用户，页面中间的卡片将会显示无数据并提示用户添加设备或消息：

#figure(
  image("assets/manual/dashboard-empty.png", width: 80%)
)

当页面较窄或使用移动端访问时页面会重新排布，且页面卡片中的表格将支持横向滚动：

#figure(
  image("assets/manual/dashboard-scroll.png", width: 35%)
)

== 设备管理

点击导航栏中的 #inline-menu(icon: "assets/manual/appstore.svg")[Devices] 菜单，可以跳转到设备管理界面 `/devices`。在该页面中，可以查看设备列表，也可以添加设备或修改已有设备的信息，包括设备名称、设备类型、设备位置，同时可以删除设备。

#figure(
  image("assets/manual/devices.png", width: 80%)
)

=== 添加设备

在该页面的右下角，除了有查看帮助和回到页面顶部的按钮外，还有一个 #inline-button[+] 按钮，点击该按钮，将会弹出添加设备的对话框：

#figure(
  image("assets/manual/devices-add.png", width: 50%)
)

在该对话框中，输入设备名称、设备类型、设备位置，点击 #inline-button("OK") 按钮即可添加设备。若添加成功，会弹出提示框，提示添加成功：

#figure(
  image("assets/manual/devices-add-success.png", width: 50%)
)

在该提示框中也可以看到生成的对应的设备 ID，用于发送消息。点击 #inline-button("Done") 按钮，即可关闭该提示框。也可以点击 #inline-button(bg-color: rgb(31,136,61),"Add Another") 按钮，继续添加设备。

=== 修改或删除设备

在设备列表中，点击某个设备卡片，会弹出修改或删除设备信息的对话框：

#figure(
  image("assets/manual/devices-edit.png", width: 50%)
)

在该对话框中，可以修改设备名称、设备类型、设备位置，点击 #inline-button("OK") 按钮即可修改设备信息。若修改成功，会弹出提示，提示修改成功：

#figure(
  image("assets/manual/devices-edit-success.png", width: 50%)
)

而在修改设备的对话框中点击 #inline-button(bg-color: rgb(255,77,79),"Delete") 按钮，会弹出确认删除的提示框：

#figure(
  image("assets/manual/devices-delete.png", width: 50%)
)

在该提示框中，点击 #inline-button(bg-color: white, fg-color: rgb(255,77,79), stroke: 1pt + rgb(245,245,245))[Delete] 按钮即可删除设备。若删除成功，会弹出提示，提示删除成功：

#figure(
  image("assets/manual/devices-delete-success.png", width: 50%)
)

== 设备消息查询

点击导航栏中的 #inline-menu(icon: "assets/manual/search.svg")[Searching] 菜单，可以跳转到设备信息查询界面 `/search`。在该页面中，可以选择设备以及时间范围，选择好后，点击 #inline-button(image("assets/manual/search-white.svg", width: 6pt)) 按钮，查询设备在该时间范围内上报的数据。查询结果以表格的形式展示，同时可以查看对应的轨迹地图。

#figure(
  image("assets/manual/search.png", width: 80%)
)

其中，选择设备的下拉框也支持用户输入设备名进行查找：

#figure(
  image("assets/manual/search-device.png", width: 50%)
)

用户也可以不选择时间范围，直接进行搜索，此时将会搜索所有设备在所有时间上报的数据。在该页面的地图上，同样可以将鼠标移动到设备标记上，查看设备的详细信息：

#figure(
  image("assets/manual/search-map-hover.png", width: 80%)
)

== 用户账户管理

用鼠标点击或移动到导航栏中的 #box(image("assets/manual/avatar.png", height: 10pt)) 头像上，会弹出用户账户管理界面的菜单：

#figure(
  image("assets/manual/user-menu.png", width: 50%)
)

=== 退出登录

点击其中的 #inline-menu(icon: "assets/manual/logout.svg")[Log out] 菜单，可以退出登录，跳转到登录界面。

=== 账户设置

点击 #inline-menu(icon: "assets/manual/setting.svg")[Settings] 菜单，则可以跳转到用户信息管理界面 `/settings`。在该页面中，可以修改自己的用户信息，包括用户名、密码、邮箱等。

#figure(
  image("assets/manual/settings.png", width: 80%)
)

在该页面中，上方展示了用户的基本信息，包括用户名、邮箱，在页面左侧可以选择管理账户或修改密码。点击 #inline-menu(icon: "assets/manual/setting.svg")[Account] 菜单，可以修改用户名和邮箱，也可以删除账户。点击 #inline-menu(icon: "assets/manual/lock.svg")[Password] 菜单，可以修改密码。

当用户的页面较窄或使用移动端访问时，页面会重新排布，左侧导航栏会显示在页面上方：

#figure(
  image("assets/manual/settings-mobile.png", width: 35%)
)

==== 修改用户名和邮箱

在上图中，我们已经选择了管理账户，可以修改用户名和邮箱，也可以删除账户。若要修改用户名和邮箱，仅需要在对应的输入框中输入新的用户名和邮箱，点击旁边的 #inline-button()[Change] 按钮即可修改成功。

==== 删除账户

若要删除账户，在点击 #inline-button(icon: "assets/manual/delete-white.svg",bg-color: rgb(255,77,79))[Delete Account] 按钮后，会弹出确认删除的对话框：

#figure(
  image("assets/manual/settings-delete.png", width: 50%)
)

在该对话框中，用户输入密码，点击 #inline-button(bg-color: rgb(255,77,79))[I'm sure, delete my account!] 按钮即可删除账户。删除成功后会跳转到登录界面。

==== 修改密码

若要修改密码，点击左侧的 #inline-menu(icon: "assets/manual/lock.svg")[Password] 菜单，即可跳转到修改密码的界面：

#figure(
  image("assets/manual/settings-password.png", width: 80%)
)

在该界面中，输入旧密码和新密码，点击 #inline-button()[Change] 按钮即可修改密码。若修改成功，会弹出提示框，提示修改成功：

#figure(
  image("assets/manual/settings-password-success.png", width: 60%)
)