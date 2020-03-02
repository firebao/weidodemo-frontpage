//载入用户、订单、活动路由模块
import user from "./user";
import order from "./order";
import activity from "./activity";

//导出路由模块
export default [...user, ...order, ...activity];
