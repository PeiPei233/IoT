package bs.backend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class RouteForwardingController {

    @RequestMapping(value = "/{path:[^\\\\.]*}")
    public String forward() {
        return "forward:/";
    }

}
