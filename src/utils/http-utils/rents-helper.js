import { useState } from "react";
import { getUserById } from "./user-requests";

export function getTotalDays(startdate,endDate){
var dateStart = new Date(startdate);
var dateEnd = new Date(endDate);
const timeDiff = dateEnd.getTime() - dateStart.getTime();
const daysDiff = timeDiff/(1000*3600*24);

return daysDiff;
}


// vip-15% 3->5% 5->7% 10->10%
export function calculatePrice(startDate,endDate,price,isVip){

    var totalDays = getTotalDays(startDate,endDate);

    if(isVip)
    {
        return totalDays*price*0.85;
    }
    if(totalDays < 3)
    {
        return totalDays*price;
    }
    if(totalDays>=3 && totalDays<5)
    {
        return totalDays*price*0.95;
    }
    if(totalDays>=5 && totalDays<10)
    {
        return totalDays*price*0.93;
    }
    if(getTotalDays(startDate,endDate)>10)
    {
        return totalDays*price*0.9;
    }
    
}

