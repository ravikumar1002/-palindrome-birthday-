
function reverseValue(str) {
    let charList = str.split('')
    let reversedList = charList.reverse()
    let reverseoutput = reversedList.join('')
    return reverseoutput
}

function checkForPalindrome(str) {
    let reversedString = reverseValue(str);
    return str === reversedString;


}

function dateFromNumberToString(date) {
  let  datechecking = { day: "", month: "", year: "" }

    if (date.day < 10) {
        datechecking.day = "0" + date.day
    } else {
        datechecking.day = date.day.toString()
    }

    if (date.month < 10) {
        datechecking.month = "0" + date.month
    } else {
        datechecking.month = date.month.toString()
    }

    datechecking.year = date.year.toString()

    return datechecking

}

function returnsAllDateFormat(date) {
    let dateStr = dateFromNumberToString(date);

    let ddmmyyyy = dateStr.day + dateStr.month +  dateStr.year;
    let mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    let  yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    let ddmmyy = dateStr.day  + dateStr.month + dateStr.year.slice(-2);
    let mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    let  yymmdd = dateStr.year.slice(-2)  + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}


function checkPalindromeAllDateFormat(date) {
    let dateFormatList = returnsAllDateFormat(date)
    let flag = false
    for (let i = 0; i < dateFormatList.length; i++) {
        if (checkForPalindrome(dateFormatList[i])){
            flag = true
        break
    }}
    return flag
}

function leapYear(year) {
    if (year % 400 === 0) {
        return true
    }
    if (year % 100 === 0) {
        return false
    }
    if (year % 4 === 0) {
        return true
    }

    return false
}

// console.log(leapYear(1700))

function getNextDate(date) {
    let day = date.day + 1
    let month = date.month
    let year = date.year

    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    if (month === 2) {
        if (leapYear(year)) {
            if (day > 29) {
                day = 1
                month++
            }
        }
        else {
            if (day > 28) {
                day = 1
                month++
            }
        }

    } else {
        if (day > daysInMonth[month - 1]) {
            day = 1
            month++
        }
    }

    if (month > 12) {
        month = 1
        year++
    } return {
        day: day,
        month: month,
        year: year
    }

}


function getNextPalindromeDate(date) {
    let ctr = 0
    let nextDate = getNextDate(date)


    while (1) {
        ctr++
        let ispalindrome = checkPalindromeAllDateFormat(nextDate)
        if (ispalindrome) {
            break
        }
        nextDate = getNextDate(nextDate)
    }
    return [ctr, nextDate]

}






const inputDate = document.querySelector("#input-date")
const showbtn = document.querySelector(".show-btn")
const outputMsg = document.querySelector(".output-msg")

function clickhandler() {
    let bdayStr = inputDate.value
    // console.log(bdayStr)
    if (bdayStr !== "") {
        let listOfDate = bdayStr.split("-")
        let date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        }
        let ispalindrome = checkPalindromeAllDateFormat(date)
        if (ispalindrome) {
            outputMsg.innerText = "Yay! your birthday is a palindrome!! 🎊"
        }
        else {
            let [ctr, nextDate] = getNextPalindromeDate(date)
            outputMsg.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${ctr} ${ctr===1? "day": "days"} 😥`
        }
    }
}


showbtn.addEventListener("click", function () {
    outputMsg.innerText = "Processing... "
    setTimeout(() => {
    clickhandler()       
    }, 1000);
})








