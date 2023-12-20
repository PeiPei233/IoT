#import "report-template.typ": *

#show: project.with(
  verbose: false,
  title: "运行测试",
  before-title: "第三部分"
)

= 测试介绍

== 测试目的

此次项目的测试对象为在2023-2024学年秋冬学期《B/S体系软件设计》课程中设计的物联网管理系统，旨在确保物联网应用网站的质量和性能符合设计和用户需求。测试过程将覆盖所有关键功能、性能指标，以及系统稳定性和安全性。

测试的主要目的是验证系统是否满足功能性和非功能性需求，包括但不限于用户界面的友好性、系统的稳定性、性能指标、安全性、以及错误处理能力。

== 测试范围

测试的范围包括但不限于以下内容：

- 系统的功能性测试：确保所有功能按照需求运行。
- 系统的安全性测试：验证系统的安全性，包括但不限于数据加密、防止SQL注入等。
- 系统的兼容性测试：确保系统能够在不同的浏览器和操作系统上正常运行。

在本次测试中，我们会对系统的所有模块进行测试，包括用户模块、设备模块、消息模块等等。

== 测试环境

/ 操作系统: Windows 11
/ CPU: Intel(R) Core(TM) i7-10700K CPU \@ 3.80GHz 3.79 GHz
/ 内存: 16.0 GB
/ 浏览器: Google Chrome 94.0.4606.81

== 测试方法

在测试过程中，我们将主要使用黑盒测试的方法，即不考虑系统的内部结构和实现细节，只测试系统的输入和输出，旨在评估系统的基本功能和性能。我们将测试验证系统的所有功能，包括但不限于用户登录、设备查询、模拟设备发送消息等等。我们也会模拟用户的各种行为，包括可能出现的各种用户的异常操作，以及对系统的各种异常输入，以验证系统的稳定性和安全性。

= 测试结果

== 功能性测试

=== 用户登录界面测试

用户登陆界面需要包含用户名和密码两个输入框，以及一个登录按钮。在输入用户名和密码后，点击登录按钮，验证是否能够成功登录。若登录成功，应该跳转到用户主界面；若登录失败，应该弹出错误提示。

==== 账号密码正确

/ 输入用户名: admin
/ 输入密码: 123456

系统正常登录，跳转到用户主界面。

==== 用户名或密码错误

测试用例1：用户名错误

/ 输入用户名: admin1
/ 输入密码: 123456

测试用例2：密码错误

/ 输入用户名: admin
/ 输入密码: 1234567

#figure(
  image("assets/test/1.png", width: 70%),
)

两种情况下，系统都弹出错误提示，提示登陆失败。

==== 用户名或密码为空

测试用例1：用户名为空时

#figure(
  image("assets/test/3.png", width: 30%)
)

测试用例2：密码为空时

#figure(
  image("assets/test/2.png", width: 30%)
)

两种情况下，系统都弹出错误提示，提示用户输入用户名和密码。

=== 用户注册界面测试

用户注册界面需要包含用户名、密码、确认密码、邮箱等输入框，以及一个注册按钮。在输入所有信息后，点击注册按钮，验证是否能够成功注册。若注册成功，应该跳转到用户登录界面；若注册失败，应该弹出错误提示。

==== 注册成功

/ 输入邮箱: pei\@pei.com
/ 输入用户名: peipei
/ 输入密码: peipei
/ 确认密码: peipei

系统正常注册，跳转到用户登录界面。

==== 重复的用户名或邮箱

为了方便测试，我们先行注册几个用户，在数据库中已经存在以下数据：

#figure(
  image("assets/test/4.png", width: 70%)
)

测试用例1：重复的邮箱。输入邮箱 peipei\@pei.com，可以看到系统弹出错误提示，提示用户名已经存在。

#figure(
  image("assets/test/5.png", width: 25%)
)

测试用例2：重复的用户名。输入用户名 peipei，可以看到系统弹出错误提示，提示用户名已经存在。

#figure(
  image("assets/test/6.png", width: 25%)
)

==== 密码和确认密码不一致

测试用例：密码和确认密码不一致。输入密码 123456，确认密码 1234567，可以看到系统弹出错误提示，提示两次输入的密码不一致。

#figure(
  image("assets/test/diff-password.png", width: 25%)
)

==== 邮箱格式不正确

测试用例：邮箱格式不正确。输入邮箱 peipei，可以看到系统弹出错误提示，提示邮箱格式不正确。

#figure(
  image("assets/test/invalid-email.png", width: 25%)
)

==== 密码长度不够

测试用例：密码长度不够。输入密码 12345，可以看到系统弹出错误提示，提示密码长度不够。

#figure(
  image("assets/test/short-pwd.png", width: 25%)
)

==== 空表单

测试用例：空表单。点击注册按钮，可以看到系统弹出错误提示，提示用户名、密码、确认密码、邮箱不能为空。

#figure(
  image("assets/test/empty-register.png", width: 25%)
)

=== 用户信息设置界面测试

==== 修改用户名或邮箱

测试用例1：修改用户名。输入用户名 admin1，可以看到系统弹出成功提示，提示用户名修改成功，且上方的用户名已经更新。

#figure(
  image("assets/test/change-username.png", width: 70%)
)

测试用例2：修改邮箱。输入邮箱 admin\@admin.com，可以看到系统弹出成功提示，提示邮箱修改成功，且上方的邮箱已经更新。

#figure(
  image("assets/test/change-email.png", width: 70%)
)

测试用例3：重复的用户名或邮箱。输入用户名 peipei，可以看到系统弹出错误提示，提示用户名已经存在。输入邮箱 peipei\@pei.com，可以看到系统弹出错误提示，提示邮箱已经存在。

#figure(
  image("assets/test/change-exist.png", width: 70%)
)

==== 修改密码

测试用例1：修改密码。输入原密码 123456，新密码 1234567，确认密码 1234567，可以看到系统弹出成功提示，提示密码修改成功。

#figure(
  image("assets/test/change-password-succ.png", width: 70%)
)

测试用例2：原密码错误。输入原密码 12345678，新密码 123456，确认密码 123456，可以看到系统弹出错误提示，提示原密码错误。

#figure(
  image("assets/test/change-pwd-fail.png", width: 90%)
)

测试用例3：新密码和确认密码不一致。输入原密码 123456，新密码 123456，确认密码 1234567，可以看到系统弹出错误提示，提示两次输入的密码不一致。

#figure(
  image("assets/test/change-pwd-diff.png", width: 50%)
)

测试用例4：新密码长度不够。输入原密码 123456，新密码 12345，确认密码 12345，可以看到系统弹出错误提示，提示密码长度不够。

#figure(
  image("assets/test/change-pwd-short.png", width: 50%)
)

测试用例5：空表单。点击修改密码按钮，可以看到系统弹出错误提示，提示原密码、新密码、确认密码不能为空。

#figure(
  image("assets/test/change-pwd-empty.png", width: 50%)
)

=== 设备管理界面测试

==== 添加设备

测试用例1：添加设备。输入设备名称“大疆”，设备类型“无人机”，设备位置“杭州”，点击添加设备按钮，可以看到系统弹出成功提示，提示设备添加成功，并成功显示设备信息。

#figure(
  image("assets/test/add-device.png", width: 60%)
)

测试用例2：空表单。点击添加设备按钮，可以看到系统弹出错误提示，提示设备名称、设备类型不能为空。

#figure(
  image("assets/test/add-device-empty.png", width: 60%)
)

==== 修改设备

测试用例1：修改上述设备的设备名称为“大疆无人机”。输入设备名称“大疆无人机”，设备类型“无人机”，设备位置“杭州”，点击修改设备按钮，可以看到系统弹出成功提示，提示设备修改成功，并成功显示设备信息。

#figure(
  image("assets/test/modify-device.png", width: 30%)
)

测试用例2：空表单。点击修改设备按钮，可以看到系统弹出错误提示，提示设备名称、设备类型不能为空。

#figure(
  image("assets/test/modify-device-empty.png", width: 50%)
)

==== 删除设备

测试用例：删除上述设备。点击删除设备按钮，可以看到系统弹出成功提示，提示设备删除成功。

#figure(
  image("assets/test/delete-device.png", width: 80%)
)

=== 设备消息查询界面测试

==== 无设备

测试用例：无设备。在设备消息查询界面，点击查询按钮，可以看到系统弹出错误提示，提示当前用户无设备。

#figure(
  image("assets/test/no-device.png", width: 80%)
)

==== 空表单

测试用例：空表单。在设备消息查询界面，点击查询按钮，可以看到系统弹出错误提示，提示请选择设备。

#figure(
  image("assets/test/empty-device.png", width: 80%)
)

==== 无消息

测试用例：无消息。在设备消息查询界面，选择设备“大疆无人机”，点击查询按钮，可以看到系统弹出错误提示，提示当前设备无消息。

#figure(
  image("assets/test/no-message.png", width: 80%)
)

==== 正常查询

测试用例：正常查询。如下图所示，可以看到系统成功显示了设备的消息。

#figure(
  image("assets/test/normal-query.png", width: 80%)
)

=== 消息统计界面测试

==== 无设备

当用户没有添加设备时，消息统计界面显示无数据并提示用户添加设备。

#figure(
  image("assets/test/no-device-stat.png", width: 80%)
)

==== 有设备无消息

当用户添加了设备但是没有消息时，消息统计界面仅显示设备数据并提示用户发送消息。

#figure(
  image("assets/test/no-message-stat.png", width: 80%)
)

==== 有设备有消息

当用户添加了设备并且有消息时，消息统计界面正常显示设备数据和消息数据。

#figure(
  image("assets/test/normal-stat.png", width: 80%)
)

=== 设备发送消息测试

使用提供的设备消息模拟器，模拟设备发送消息。

测试用例1：无效的设备ID。模拟不存在的设备 ID 发送消息，模拟器已提示消息发送成功：

#figure(
  image("assets/test/invalid-device-1.png", width: 80%)
)

但是在后端系统中，可以看到系统弹出错误提示，提示设备不存在：

#figure(
  image("assets/test/invalid-device-2.png", width: 80%)
)

测试用例2：正常发送消息。模拟设备 ID 为 10 的设备（即2.1.4.1节中注册的设备）发送消息，模拟器已提示消息发送成功：

#figure(
  image("assets/test/normal-send-1.png", width: 80%)
)

在后端系统中，可以看到系统成功接收到了消息：

#figure(
  image("assets/test/normal-send-2.png", width: 80%)
)

在前端系统中，可以成功查询到消息：

#figure(
  image("assets/test/normal-send-3.png", width: 80%)
)

== 安全性测试

=== SQL注入

测试用例：SQL注入。在用户登录界面，输入用户名 `admin`，密码 `123456' or '1'='1`，可以看到系统弹出错误提示，提示用户名或密码错误。

#figure(
  image("assets/test/sql-injection.png", width: 80%)
)

=== 未登录用户访问

测试用例：未登录用户访问。在用户未登录时，强行访问 `/dashboard`，可以看到系统弹出错误提示，提示用户未登录，并跳转到登录界面。

#figure(
  image("assets/test/unauthorized.png", width: 80%)
)

=== 密码加密

测试用例：密码加密。在数据库中，可以看到用户的密码已经被加密。

#figure(
  image("assets/test/encrypt.png", width: 80%)
)

== 移动端兼容性测试

使用开发者工具，模拟移动端浏览器进行测试。

=== 登录注册界面

#align(center, grid(
  columns: (auto, auto),
  image("assets/test/mobile-login.png", width: 80%),
  image("assets/test/mobile-register.png", width: 80%)
))

可以看到，登录注册界面在移动端浏览器上正常显示。

=== 消息统计界面

数据图表如下：

#figure(
  image("assets/test/mobile-stat.png", width: 40%)
)

表格可以上下或者左右滚动，效果如下：

#figure(
  image("assets/test/mobile-stat-table.png", width: 40%)
)

地图如下：

#figure(
  image("assets/test/mobile-stat-map.png", width: 40%)
)

可以看到，消息统计界面在移动端浏览器上正常显示。

=== 设备管理界面

#figure(
  image("assets/test/mobile-device.png", width: 40%)
)

可以看到，设备管理界面在移动端浏览器上正常显示。

=== 设备消息查询界面

查询结果表格可以上下或者左右滚动，效果如下：

#figure(
  image("assets/test/mobile-query.png", width: 40%)
)

查询结果地图如下：

#figure(
  image("assets/test/mobile-query-map.png", width: 30%)
)

可以看到，设备消息查询界面在移动端浏览器上正常显示。

=== 用户信息设置界面

菜单栏以及修改信息的表单可以正常显示，效果如下：

#align(center, grid(
  columns: (auto, auto),
  image("assets/test/mobile-user.png", width: 70%),
  image("assets/test/mobile-user-form.png", width: 70%)
))

可以看到，用户信息设置界面在移动端浏览器上正常显示。

= 测试结论

本次测试覆盖了系统的所有功能，包括用户登录、用户注册、用户信息设置、设备管理、设备消息查询、消息统计、设备发送消息等等。测试结果显示，系统的所有功能均正常运行，符合设计和用户需求。系统的安全性也得到了验证，包括但不限于防止SQL注入、密码加密等。系统的兼容性也得到了验证，可以在不同的浏览器和操作系统上正常运行。

= 后续建议

- 定期维护：为了确保系统的稳定性和安全性，建议定期维护系统，包括但不限于更新系统、修复漏洞等。
- 用户反馈：建议增加用户反馈功能，以便用户可以及时反馈系统的问题，以便及时修复。
- 扩展测试：随着用户量的增加，定期进行更广泛的性能和安全测试。
- 数据备份：建立定期数据备份机制，确保数据安全。
