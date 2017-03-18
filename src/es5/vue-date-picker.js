﻿var vue_date_picker={
	props: {
		width: { type: String, default: '238px' },
		readonly: { type: Boolean, default: false },
		value: { type: String, default: '' },
		format: { type: String, default: 'YYYY-MM-DD' },
		name: { type: String, default: '' }
	},
	data :function() {
		return {
			pickedValue:'',
			show: false,
			days: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
			months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
			date: [],
			now: new Date()
		};
	},
	watch: {
		now () {
			this.update();
		},
		show () {
			this.update();
		}
	},
	methods: {
		close :function() {
			this.show = false;
		},
		update :function() {
			var arr = [];
			var time = new Date(this.now);
			time.setMonth(time.getMonth(), 1);           // the first day
			var curFirstDay = time.getDay();
			curFirstDay === 0 && (curFirstDay = 7);
			time.setDate(0);                             // the last day
			var lastDayCount = time.getDate();
			for (var i = curFirstDay; i > 0; i--) {
				arr.push({
					text: lastDayCount - i + 1,
					time: new Date(time.getFullYear(), time.getMonth(), lastDayCount - i + 1),
					status: 'date-pass'
				});
			}

			time.setMonth(time.getMonth() + 2, 0);       // the last day of this month
			var curDayCount = time.getDate();
			time.setDate(1);                             // fix bug when month change
			var value = this.pickedValue || this.stringify(new Date());
			for (var i = 0; i < curDayCount; i++) {
				var tmpTime = new Date(time.getFullYear(), time.getMonth(), i + 1);
				var status = '';
				this.stringify(tmpTime) === value && (status = 'date-active');
				arr.push({
					text: i + 1,
					time: tmpTime,
					status: status
				});
			}

			var j = 1;
			while (arr.length < 42) {
				arr.push({
					text: j,
					time: new Date(time.getFullYear(), time.getMonth() + 1, j),
					status: 'date-future'
				});
				j++;
			}
			this.date = arr;
		},
		yearClick :function(flag) {
			this.now.setFullYear(this.now.getFullYear() + flag);
			this.now = new Date(this.now);
		},
		monthClick :function(flag) {
			this.now.setMonth(this.now.getMonth() + flag);
			this.now = new Date(this.now);
		},
		pickDate :function(index) {
			if(index >= this.date[index].length) 
				return;
			this.show = false;
			this.now = new Date(this.date[index].time);
			this.pickedValue = this.stringify();
		},
		parse :function(str) {
			var time = new Date(str);
			return isNaN(time.getTime()) ? null : time;
		},
		stringify :function(time = this.now, format = this.format) {
			var year = time.getFullYear();
			var month = time.getMonth() + 1;
			var date = time.getDate();
			var monthName = this.months[time.getMonth()];

			var map = {
				YYYY: year,
				MMM: monthName,
				MM: ('0' + month).slice(-2),
				M: month,
				DD: ('0' + date).slice(-2),
				D: date
			};
			return format.replace(/Y+|M+|D+/g, function (str) {
				return map[str];
			});
		},
		leave:function (e) {
			if (!this.$el.contains(e.target)) {
				this.close();
			}
		}
	},
	mount:function () {
		this.pickedValue=this.value;
		this.$nextTick(function(){
			this.now = this.parse(this.pickedValue) || new Date();
			document.addEventListener('click', this.leave, false);
		});
	},
	beforeDestroy:function () {
		document.removeEventListener('click', this.leave, false);
	},
	template:'-@templateString@-'
};