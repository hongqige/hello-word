### @ConditionalOnProperty
>控制开关，在类名上面编写
通过其两个属性name以及havingValue来实现的，其中name用来从application.properties中读取某个属性值。
如果该值为空，则返回false;
如果值不为空，则将该值与havingValue指定的值进行比较，如果一样则返回true;否则返回false。
如果返回值为false，则该configuration不生效；为true则生效。

代码演示：
```
@Configuration
//在application.properties配置"mf.assert"，对应的值为true
@ConditionalOnProperty(prefix="mf",name = "assert", havingValue = "true")
public class AssertConfig {
    @Autowired
    private HelloServiceProperties helloServiceProperties;
    @Bean
    public HelloService helloService(){
        HelloService helloService = new HelloService();
        helloService.setMsg(helloServiceProperties.getMsg());
        return helloService;
    }
}
```
