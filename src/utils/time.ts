import { formatDistance, format } from "date-fns";
import { ja } from "date-fns/locale";

const sleep = async (msec: number) => {
  return new Promise(function (resolve: (value: unknown) => void) {
    setTimeout(function () {
      resolve("");
    }, msec);
  });
};

const getAboutDate = (date: Date | string) => {
  if (typeof date === "string") {
    date = new Date(date);
  }

  let time = formatDistance(new Date(), date, {
    locale: ja,
  });

  if (time.indexOf("未満") !== -1) {
    time = "たった今";
  } else if (time.indexOf("か月") !== -1 || time.indexOf("年") !== -1) {
    time = format(date, "yyyy年M月d日", {
      locale: ja,
    });
  } else {
    time = time + "前";
  }

  return time.replace("約", "");
};

const getFormattedDate = (date: Date | string) => {
  if (typeof date === "string") {
    date = new Date(date);
  }

  date = format(date, "yyyy年MM月dd日 hh:mm");

  return date;
};

export { sleep, getAboutDate, getFormattedDate };
