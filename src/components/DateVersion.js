import { View, Text, StyleSheet, useWindowDimensions } from "react-native";

function DateVersion({ version, sliderValue, pickedDateTime, fontColor }) {
  const newdate = new Date();

  function getYear() {
    const year = newdate.getFullYear();
    if (pickedDateTime === null) {
      return year;
    } else {
      const pickedYear = pickedDateTime.slice(0, 4);
      return pickedYear;
    }
  }

  function getMonth() {
    if (pickedDateTime === null) {
      const month = newdate.getMonth() + 1;
      if (month < 10) {
        return `0${month}`;
      } else {
        return month;
      }
    } else {
      const pickedMonth = pickedDateTime.slice(5, 7);
      return pickedMonth;
    }
  }

  function getMonthSliceZero() {
    if (pickedDateTime === null) {
      const month = newdate.getMonth() + 1;
      return month;
    } else {
      const pickedMonth = pickedDateTime.slice(5, 7);
      if (pickedMonth[0] === "0") {
        return pickedMonth[1];
      } else {
        return pickedMonth;
      }
    }
  }

  function getMonthEng() {
    if (pickedDateTime === null) {
      const month = newdate.getMonth() + 1;
      if (month === 1) {
        return "Jan";
      } else if (month === 2) {
        return "Feb";
      } else if (month === 3) {
        return "Mar";
      } else if (month === 4) {
        return "Apr";
      } else if (month === 5) {
        return "May";
      } else if (month === 6) {
        return "Jun";
      } else if (month === 7) {
        return "Jul";
      } else if (month === 8) {
        return "Aug";
      } else if (month === 9) {
        return "Sep";
      } else if (month === 10) {
        return "Oct";
      } else if (month === 11) {
        return "Nov";
      } else if (month === 12) {
        return "Dec";
      }
    } else {
      const month = pickedDateTime.slice(5, 7);
      if (month === "01") {
        return "Jan";
      } else if (month === "02") {
        return "Feb";
      } else if (month === "03") {
        return "Mar";
      } else if (month === "04") {
        return "Apr";
      } else if (month === "05") {
        return "May";
      } else if (month === "06") {
        return "Jun";
      } else if (month === "07") {
        return "Jul";
      } else if (month === "08") {
        return "Aug";
      } else if (month === "09") {
        return "Sep";
      } else if (month === "10") {
        return "Oct";
      } else if (month === "11") {
        return "Nov";
      } else if (month === "12") {
        return "Dec";
      }
    }
  }

  function getDate() {
    if (pickedDateTime === null) {
      const date = newdate.getDate();
      if (date < 10) {
        return `0${date}`;
      } else {
        return date;
      }
    } else {
      const pickedDate = pickedDateTime.slice(8, 10);
      return pickedDate;
    }
  }

  function getDateSliceZero() {
    if (pickedDateTime === null) {
      const date = newdate.getDate();
      return date;
    } else {
      const pickedDate = pickedDateTime.slice(8, 10);
      if (pickedDate[0] === "0") {
        return pickedDate[1];
      } else {
        return pickedDate;
      }
    }
  }

  function getTimes() {
    if (pickedDateTime === null) {
      const hours = newdate.getHours();
      const minutes = newdate.getMinutes();
      const getHours = () => {
        if (0 < hours < 10) {
          return `${hours}`;
        } else if (hours <= 12) {
          return `${hours}`;
        } else if (hours > 12) {
          return `${hours - 12}`;
        }
      };
      const getMinutes = () => {
        if (minutes < 10) {
          return `0${minutes}`;
        } else {
          return minutes;
        }
      };
      const getAmPm = () => {
        if (hours < 12) {
          return "AM";
        } else {
          return "PM";
        }
      };
      return `${getHours()}:${getMinutes()} ${getAmPm()}`;
    } else {
      const pickedHours = pickedDateTime.slice(11, 13);
      const pickedMinutes = pickedDateTime.slice(14, 16);
      const getHours = () => {
        if (pickedHours < 10) {
          return `${pickedHours.slice(1)}`;
        } else if (pickedHours <= 12) {
          return `${pickedHours}`;
        } else if (pickedHours > 12) {
          return `${pickedHours - 12}`;
        }
      };
      const getMinutes = () => {
        return pickedMinutes;
      };
      const getAmPm = () => {
        if (pickedHours < 12) {
          return "AM";
        } else {
          return "PM";
        }
      };
      return `${getHours()}:${getMinutes()} ${getAmPm()}`;
    }
  }

  function getDayShort() {
    if (pickedDateTime === null) {
      const day = newdate.getDay();
      if (day === 0) {
        return "Sun";
      } else if (day === 1) {
        return "Mon";
      } else if (day === 2) {
        return "Tue";
      } else if (day === 3) {
        return "Wed";
      } else if (day === 4) {
        return "Thu";
      } else if (day === 5) {
        return "Fri";
      } else if (day === 6) {
        return "Sat";
      }
    } else {
      const pickedYear = pickedDateTime.slice(0, 4);
      const pickedMonth = pickedDateTime.slice(5, 7);
      const pickedDate = pickedDateTime.slice(8, 10);
      const pickedFullDate = `${pickedYear}-${pickedMonth}-${pickedDate}`;
      const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const dayOfWeek = week[new Date(pickedFullDate).getDay()];
      return dayOfWeek;
    }
  }

  function getDayLong() {
    if (pickedDateTime === null) {
      const day = newdate.getDay();
      if (day === 0) {
        return "Sunday";
      } else if (day === 1) {
        return "Monday";
      } else if (day === 2) {
        return "Tuesday";
      } else if (day === 3) {
        return "Wednesday";
      } else if (day === 4) {
        return "Thursday";
      } else if (day === 5) {
        return "Friday";
      } else if (day === 6) {
        return "Saturday";
      }
    } else {
      const pickedYear = pickedDateTime.slice(0, 4);
      const pickedMonth = pickedDateTime.slice(5, 7);
      const pickedDate = pickedDateTime.slice(8, 10);
      const pickedFullDate = `${pickedYear}-${pickedMonth}-${pickedDate}`;
      const week = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const dayOfWeek = week[new Date(pickedFullDate).getDay()];
      return dayOfWeek;
    }
  }

  function getDayKo() {
    if (pickedDateTime === null) {
      const day = newdate.getDay();
      if (day === 0) {
        return "(일)";
      } else if (day === 1) {
        return "(월)";
      } else if (day === 2) {
        return "(화)";
      } else if (day === 3) {
        return "(수)";
      } else if (day === 4) {
        return "(목)";
      } else if (day === 5) {
        return "(금)";
      } else if (day === 6) {
        return "(토)";
      }
    } else {
      const pickedYear = pickedDateTime.slice(0, 4);
      const pickedMonth = pickedDateTime.slice(5, 7);
      const pickedDate = pickedDateTime.slice(8, 10);
      const pickedFullDate = `${pickedYear}-${pickedMonth}-${pickedDate}`;
      const week = ["(일)", "(월)", "(화)", "(수)", "(목)", "(금)", "(토)"];
      const dayOfWeek = week[new Date(pickedFullDate).getDay()];
      return dayOfWeek;
    }
  }

  const { fontScale } = useWindowDimensions();

  if (version === "ver1") {
    return (
      <View
        style={{
          alignItems: "center",
          paddingVertical: 10,
          paddingHorizontal: 10,
        }}
      >
        <View style={{ paddingVertical: 5 }}>
          <Text
            style={{
              color: fontColor,
              fontSize: sliderValue / fontScale,
              fontWeight: "bold",
            }}
          >
            {getDayLong()}
          </Text>
        </View>
        <View>
          <Text
            style={{
              color: fontColor,
              fontSize: (sliderValue * 0.6) / fontScale,
              textAlign: "center",
            }}
          >
            {getYear()}-{getMonth()}-{getDate()}
          </Text>
        </View>
        <View>
          <Text
            style={{
              color: fontColor,
              fontSize: (sliderValue * 0.6) / fontScale,
              textAlign: "center",
            }}
          >
            {getTimes()}
          </Text>
        </View>
      </View>
    );
  }

  if (version === "ver2") {
    return (
      <View
        style={{
          alignItems: "center",
          paddingVertical: 10,
          paddingHorizontal: 10,
        }}
      >
        <View style={{ paddingVertical: 5 }}>
          <Text
            style={{
              color: fontColor,
              fontSize: sliderValue / fontScale,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {getTimes()}
          </Text>
        </View>
        <View>
          <Text
            style={{
              color: fontColor,
              fontSize: (sliderValue * 0.7) / fontScale,
              textAlign: "center",
            }}
          >
            {getYear()}-{getMonth()}-{getDate()}&nbsp;{getDayShort()}
          </Text>
        </View>
      </View>
    );
  }

  if (version === "ver3") {
    return (
      <View
        style={{
          alignItems: "center",
          paddingVertical: 10,
          paddingHorizontal: 10,
        }}
      >
        <View style={{ paddingVertical: 5 }}>
          <Text
            style={{
              color: fontColor,
              fontSize: sliderValue / fontScale,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {getYear()}年 {getMonthSliceZero()}月 {getDateSliceZero()}日
          </Text>
        </View>
        <View>
          <Text
            style={{
              color: fontColor,
              fontSize: (sliderValue * 0.7) / fontScale,
              textAlign: "center",
            }}
          >
            {getTimes()}
          </Text>
        </View>
      </View>
    );
  }

  if (version === "ver4") {
    return (
      <View
        style={{
          alignItems: "center",
          paddingVertical: 10,
          paddingHorizontal: 10,
        }}
      >
        <View style={{ paddingVertical: 5 }}>
          <Text
            style={{
              color: fontColor,
              fontSize: sliderValue / fontScale,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {getDayShort()} {getMonthEng()} {getDate()}&nbsp;&nbsp;{getTimes()}
          </Text>
        </View>
      </View>
    );
  }

  if (version === "ver5") {
    return (
      <View
        style={{
          alignItems: "center",
          paddingVertical: 10,
          paddingHorizontal: 10,
        }}
      >
        <View style={{ paddingVertical: 5 }}>
          <Text
            style={{
              color: fontColor,
              fontSize: sliderValue / fontScale,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {getYear()}년 {getMonthSliceZero()}월 {getDateSliceZero()}일&nbsp;
            {getDayKo()}
          </Text>
        </View>
      </View>
    );
  }
}

export default DateVersion;
