/*计算房贷按钮函数*/
function calResult() {
	//获取数据
	var selectedBox = document.getElementById('selectedBox').value;
	var num = document.getElementById('loansAmount').value;
	var year = document.getElementById('loansYear').value;
	var yearRate = document.getElementById('loansRate').value;
	
	var month = parseInt(year) * 12;//还款月数
	var monthRate = parseFloat(yearRate) / 12;//月利率
	var loansNum = parseFloat(num) * 10000;//贷款金额
	
	//计算
	if(selectedBox == 0) {
		var hkAmount = (loansNum * monthRate * Math.pow((1 + monthRate), month)) / (Math.pow((1 + monthRate), month) - 1)//月供
		var totalRate = month * hkAmount - loansNum;//总利息 = 还款月数x每月月供额度-贷款金额
		var totalPrice = totalRate + loansNum;//还款总额 = 总利息+贷款金额
	} else {
		var everymonthyh = loansNum / month;//每月应还本金=贷款金额/还款月数
		var hkAmount = loansNum / month + loansNum * monthRate;//首月月供额度=(贷款金额/还款月数)+(贷款金额-累计已还本金)x月利率
		var totalRate = ((everymonthyh + loansNum * monthRate) + loansNum / month * (1 + monthRate)) / 2 * month - loansNum;//总利息=[(贷款金额/还款月数+贷款金额x月利率)+贷款金额/还款月数x(1+月利率)]/2x还款月数 - 贷款金额
		var totalPrice = totalRate + loansNum;//还款总额=总利息+贷款金额
	}
	
	//输出结果
	var res = '';
	res = '<tr><th class="cal-title">项目</th><th class="cal-price">金额</th></tr>';
	res += '<tr><td>月供</td><td>' + float(hkAmount) + '</td></tr>';
	res += '<tr><td>还款总额</td><td>' + float(totalPrice) + '</td></tr>';
	res += '<tr><td>总利息</td><td>' + float(totalRate) + '</td></tr>';
	document.getElementById('calResult').innerHTML = res;
}

//保留两位小数
function float(num){
	return Math.ceil(num*100)/100;
}

//获取输入的值
function getInputData() {
	var num = document.getElementById('loansAmount').value;
	var year = document.getElementById('loansYear').value;
	//设置贷款金额为1万~1000万元
	var numReg = new RegExp("^([0-9]{1,4})$");
	//设置贷款年限为5~30年
	var yearReg = new RegExp("^([5-9]|[12]\d|30)$");
	if(numReg.test(num) && yearReg.test(year)) {
		//验证通过
		return true
	} else {
		//验证不通过
		return false;
	}
}