$(function() {

	var dragLists = []; // drag-item数据列表
	dragLists = [{"left":"102px","top":"150px","width":"200px","height":"300px","dragType":"customize","id":"box0","val":'自定义'},{"left":"620px","top":"177px","width":"200px","height":"200px","dragType":"code","id":"box1"},{"left":"530px","top":"121px","width":"130px","height":"40px","dragType":"text","id":"box2","val":'我是值'},{"left":"775px","top":"108px","width":"400px","height":"400px","dragType":"customize","id":"box11","val":"联系人"},{"left":"311px","top":"68px","width":"200px","height":"200px","dragType":"code","id":"box4"},{"left":"205px","top":"157px","width":"150px","height":"40px","dragType":"text","id":"box5","val":'我是text'}];

	init();
	// 此页面加载时应该渲染的标签内容及位置
	function init () {
		$('.drag-item-wrapper').html('');
		var dragsLen = dragLists.length;
		var dragstr = '';
		for (var i = 0; i < dragsLen; i++) {
			
			if(dragLists[i].id){
				var idIdx = dragLists[i].id.slice(3)
			}
			if (dragLists[i].dragType == 'text') {
				dragstr = '<input drag-type="text" class="drag-item text" type="text" id="box' + idIdx + '" value="' + dragLists[i].val + '">';
			} else if (dragLists[i].dragType == 'customize') {
				dragstr = '<div drag-type="customize" class="drag-item customize" id="box' + idIdx + '"><span>' + dragLists[i].val + '</span><div class="coor" id="coor' + idIdx + '"></div></div>';
			} else if (dragLists[i].dragType == 'code') {
				dragstr = '<img drag-type="code" src="images/code.gif" class="drag-item code" id="box' + idIdx + '" draggable="false">';
			}
			$('.drag-item-wrapper').append(dragstr);
			$('.drag-item').eq(i).css({
				left: dragLists[i].left,
				top: dragLists[i].top,
				width: dragLists[i].width,
				height: dragLists[i].height 
			})
		}
		// 初始渲染时 为allTags赋值，防止页面没有修改内容
		$('.allTags').val(JSON.stringify(dragLists))
	}
	
	// 删除标签
	var removeIdx = ''; // 删除哪个标签的索引
	$(document).on('click', '.drag-item', function () {
		removeIdx = $(this).index();
	});
	$('.remove-tag').click(function () {
		$('.drag-item').eq(removeIdx).remove();
	});

	// 下拉选框
	$('.select-list span').click(function (e) {
		e.stopPropagation();
		$(this).siblings('ul').slideToggle();
	});
	$(document).click(function () {
		$('.select-list ul').slideUp();
	});
	// 赋值下拉选框 增加标签
	$('.select-list ul li').click(function (e) {
		var tagtype = $(this).html();
		$(this).parents('.select-list').find('span').html(tagtype);
		$(this).parents('.select-list').find('input').val(tagtype);
		$('.select-list ul').slideUp();

		var str = '';
		var idx = 0;
		idx = $('.drag-item-wrapper .drag-item').length;

		switch (tagtype) {
			case '文本':
				str += '<input drag-type="text" class="drag-item text" type="text" id="box' + idx + '">';
				break;
			case '虚线':
				// str += '<div class="drag-item turn dashed" drag-type="dashed" style="z-index: ' + zIndex + '"><i class="prev"></i><i class="next"></i></div>';
				break;
			case '实线':
				// str += '<div class="drag-item turn solid" drag-type="solid" style="z-index: ' + zIndex + '"><i class="prev"></i><i class="next"></i></div>';
				break;
			// case '自定义':
			// 	str += '<div drag-type="customize" class="drag-item customize" id="box' + idx +
			// 		'"><div class="coor" id="coor' + idx + '"></div></div>';
			// 	break;
			case '二维码':
				str += '<img drag-type="code" src="images/code.gif" class="drag-item code" id="box' + idx +
					'" draggable="false">';
				break;
			default:
				str += '<div drag-type="customize" class="drag-item customize" id="box' + idx +
				'"><span>' + tagtype + '</span><div class="coor" id="coor' + idx + '"></div></div>';
				break;
		}
		$('.drag-item-wrapper').append(str);
		getAllDrag();
	});

	// 新添加的文本域实时输入实时更新 总value值
	$(document).on('input', '.drag-item.text', function () {
		getAllDrag();
	});

	// 获取所有drag-item 的样式 -> 移动和添加时被获取
	function getAllDrag () {
		dragLists = [];
		var dragLen = $('.drag-item').length
		for (var i = 0; i < dragLen; i++) {
			var item = $('.drag-item').eq(i);
			var itemStyle = {
				left: item.css('left'),
				top: item.css('top'),
				width: item.css('width'),
				height: item.css('height'),
				dragType: item.attr('drag-type'),
				id: item.attr('id')
			}
			
			if(item.attr('drag-type') == 'customize'){
				itemStyle.val = item.find('span').html();
			}
			if(item.attr('drag-type') == 'text'){
				itemStyle.val = item.val();
			}
			dragLists.push(itemStyle);
		}
		$('.allTags').val(JSON.stringify(dragLists))
		console.log(dragLists)
		console.log($('.allTags').val())
	}

	// 上传打印样式图片
	$('.upload-bgimg').click(function () {
		$('.print-inner-wrapper>img').remove();
		$('.print-inner-wrapper').append('<img src="images/Doge.jpg">');
	});

	// 设置长宽
	$('.post-height').blur(function () {
		var reg = new RegExp('^[0-9]*$'); // 判断是不是数字
		if (reg.test(Number($(this).val()))) {
			if (Number($(this).val()) >= 0 && Number($(this).val()) <= 560) {
				$('.print-inner-wrapper').css({
					height: $(this).val()
				});
			} else {
				alert('高度不能超过560');
			}
		} else {
			alert('请输入数字');
		}
	});
	$('.post-width').blur(function (e) {
		var reg = new RegExp('^[0-9]*$'); // 判断是不是数字
		if (reg.test(Number($(this).val()))) {
			if (Number($(this).val()) >= 0 && Number($(this).val()) <= 1330) {
				$('.print-inner-wrapper').css({
					width: $(this).val()
				});
			} else {
				alert('宽度不能超过1330');
			}
		} else {
			alert('请输入数字');
		}
	});
	// 恢复默认图片大小
	$('.reset-img').click(function () {
		// 还原画布大小
		$('.print-inner-wrapper').css({
			width: '100%',
			height: '100%'
		});
		// 清空标签 清除图片
		$('.drag-item-wrapper').html('');
		$('.print-inner-wrapper>img').remove();
	});

	// 删除打印单样式图片
	$('.remove-bgimg').click(function () {
		$('.print-inner-wrapper>img').remove();
	});
	
	// 鼠标move移动
	$(document).mousemove(function(e) {
		if (!!this.move) {
			var maxLeft = $('.drag-item-wrapper').width() - $(document.move_target).width();
			var maxTop = $('.drag-item-wrapper').height() - $(document.move_target).height();
			var posix = !document.move_target ? {'x': 0, 'y': 0} : document.move_target.posix,
				callback = document.call_down || function() {
					var martop = '';
					var marleft = '';

					if( (e.pageY - posix.y - 165) > maxTop){
						martop = maxTop + 'px';
					}else if( (e.pageY - posix.y - 165) < 0){
						martop = 0;
					}else{
						martop = e.pageY - posix.y - 165
					}

					if( (e.pageX - posix.x - 30) > maxLeft){
						marleft = maxLeft + 'px';
					}else if( (e.pageX - posix.x - 30) < 0){
						marleft = 0;
					}else{
						marleft = e.pageX - posix.x - 30
					}

					$(this.move_target).css({
						'top': martop,
						'left': marleft
					});
				};
			callback.call(this, e, posix);
		}
	}).mouseup(function(e) {
		if (!!this.move) {
			var callback = document.call_up || function(){};
			callback.call(this, e);
			$.extend(this, {
				'move': false,
				'move_target': null,
				'call_down': false,
				'call_up': false
			});
			getAllDrag();
		}
	});

	for ( var i = 0 ; i < 1000; i ++ ) {
		(function (i) {
			var $box = '';
			$(document).on('mousedown', '.print-equipment #box' + i, function(e) {
				$box = $('#box' + i);
				var offset = $(this).offset();
				this.posix = {'x': e.pageX - offset.left, 'y': e.pageY - offset.top};
				$.extend(document, {'move': true, 'move_target': this});
			})
			$(document).on('mousedown', '.print-equipment #coor' + i, function(e) {
				// var maxWid = $('.drag-item-wrapper').width() - $box.css('left');
				// var maxHeight = $('.drag-item-wrapper').height() - $box.css('top');
				console.log($box)
				var posix = {
						'w': $box.width(), 
						'h': $box.height(), 
						'x': e.pageX, 
						'y': e.pageY
					};
				$.extend(document, {'move': true, 'call_down': function(e) {
					$box.css({
						'width': Math.max(30, e.pageX - posix.x + posix.w),
						'height': Math.max(30, e.pageY - posix.y + posix.h)
					});
				}});
			})
		})(i);
	}

	$('.view-btn').click(function () {
		$('.mask .form-wrapper').remove();
		$('.mask').show();
		$('.form-wrapper').clone().insertBefore($('.mask .print-btns'));
		// $('.mask .drag-item').removeAttr('onmousedown');//去掉标签中的onclick事件  
				// $(document).live('mousedown', '.mask .drag-item', function(e) {
				// 	e.preventDefault();
				// 	console.log(111)
				// })
	});
	$(document).on("click", '.edit-again', function () {
		$('.mask').hide();
	});

	// 解决火狐下图片拖动会产生图片页
	document.ondragstart = function() {
		return false;
	} 
});