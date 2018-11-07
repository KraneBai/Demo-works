$(function () {
  var patternIdx = ''; // 定义当前选中的是第几个要编辑的模板

  // 日期控件 
  $('#start-time').datetimepicker({
    format: 'hh:ii',
    autoclose: true,
    startView: 1
  });
  $('#start-date').datetimepicker({
    format: 'yyyy-mm-dd',
    autoclose: true,
    startView: 2,
    minView: 2
  });

  // 下拉选框
  $(document).on('click', '.select-list span', function (e) {
    e.stopPropagation();
    $(this).siblings('ul').slideToggle();
  });
  $(document).click(function (e) {
    $('.select-list ul').slideUp();
    $('.mask').hide();
    $(document).on('click', '.pattern-added-item', choosenTemplate);
  });
  // 赋值下拉选框
  $(document).on('click', '.select-list ul li', function (e) {
    $(this).parents('.select-list').find('span').html($(this).html());
    $('.select-list ul').slideUp();
    $(this).parents('.select-list').find('input').val($(this).html()).attr('data-val', $(this).html());
  });

  // 1. 点击控件库动态添加信息模板
  $('.control-library li').click(function () {
    
    var liType = $(this).attr('data-type'); // type 控件库类型

    var which = ''; // 模板字符串
    var controller = ''; // 模板控制器 设置可选一个or多个
    var ifClass = ''; // 类名的添加，控制样式


    // 只绑定一次
    if (liType == 'money' || liType == 'linkman' || liType == 'department') {
      $(this).unbind('click');
    }

    // 设置默认controller样式 
    // 设置单独样式
    // 设置样式模板
    switch (liType) {
      
      case 'radio':
        which = '<div class="form-item pattern-added-item form-block need-options" data-type="' + liType + '">\
                  <label>\
                    <span>' + $(this).html() + '</span>：\
                    <input value="radio | ' + $(this).html() + ' | 1 |  | " form-type="radio" form-value="" form-prompt="" form-validate="1" form-name="' + $(this).html() + '" type="text" name="a[]">\
                  </label>\
                  <div class="form-check-group">\
                    <div class="form-check">\
                      <input type="radio" data-index="0">\
                      <label>选项1</label>\
                    </div>\
                  </div>\
                  <i class="close"></i>\
                </div>';
        break;

      case 'checkbox':
        which = '<div class="form-item pattern-added-item form-block need-options" data-type="' + liType + '">\
                  <label>\
                    <span>' + $(this).html() + '</span>：\
                    <input value="checkbox | ' + $(this).html() + ' | 1 |  | " form-type="checkbox" form-value="" form-prompt="" form-validate="1" form-name="' + $(this).html() + '" type="text" name="a[]">\
                  </label>\
                  <div class="form-check-group">\
                    <div class="form-check">\
                      <input type="checkbox" data-index="0">\
                      <label>选项1</label>\
                    </div>\
                  </div>\
                  <i class="close"></i>\
                </div>';
        break;

      case 'money':
        which = '<div class="form-item pattern-added-item" data-type="' + liType + '">\
                  <label>\
                    <span>' + $(this).html() + '</span>：\
                    <input value="money | ' + $(this).html() + ' | 1 |  | " form-type="money" form-value="" form-prompt="" form-validate="1" form-name="' + $(this).html() + '" type="text" name="a[]">\
                  </label>\
                  <div class="form-check-group">\
                    <input type="text" readonly />\
                  </div>\
                  <i class="close"></i>\
                </div>';
        break;
        
      case 'number':
        which = '<div class="form-item pattern-added-item" data-type="' + liType + '">\
                  <label>\
                    <span>' + $(this).html() + '</span>：\
                    <input value="number | ' + $(this).html() + ' | 1 |  | " form-type="number" form-value="" form-prompt="" form-validate="1" form-name="' + $(this).html() + '" type="text" name="a[]">\
                  </label>\
                  <div class="form-check-group">\
                    <input type="text" readonly />\
                  </div>\
                  <i class="close"></i>\
                </div>';
        break;
      case 'text':
        which = '<div class="form-item pattern-added-item" data-type="' + liType + '">\
                  <label>\
                    <span>' + $(this).html() + '</span>：\
                    <input value="text | ' + $(this).html() + ' | 1 |  | " form-type="text" form-value="" form-prompt="" form-validate="1" form-name="' + $(this).html() + '" type="text" name="a[]">\
                  </label>\
                  <div class="form-check-group">\
                    <input type="text" readonly />\
                  </div>\
                  <i class="close"></i>\
                </div>';
        break;

      case 'linkman':
        which = '<div class="form-item pattern-added-item" data-type="' + liType + '">\
                  <label>\
                    <span>' + $(this).html() + '</span>：\
                    <input value="linkman | ' + $(this).html() + ' | 1 |  | 1 " form-type="linkman" form-value="1" form-prompt="" form-validate="1" form-name="' + $(this).html() + '" type="text" name="a[]">\
                  </label>\
                  <div class="form-check-group">\
                    <input type="text" readonly /><a href="javascript:;" class="choose">选择</a>\
                  </div>\
                  <i class="close"></i>\
                </div>';
        break;

      case 'department':
        which = '<div class="form-item pattern-added-item" data-type="' + liType + '">\
                  <label>\
                    <span>' + $(this).html() + '</span>：\
                    <input value="department | ' + $(this).html() + ' | 1 |  | 1 " form-type="department" form-value="1" form-prompt="" form-validate="1" form-name="' + $(this).html() + '" type="text" name="a[]">\
                  </label>\
                  <div class="form-check-group">\
                    <input type="text" readonly /><a href="javascript:;" class="choose">选择</a>\
                  </div>\
                  <i class="close"></i>\
                </div>';
        break;

      case 'date':
        which = '<div class="form-item pattern-added-item" data-type="' + liType + '">\
                  <label>\
                    <span>' + $(this).html() + '</span>：\
                    <input value="date | ' + $(this).html() + ' | 1 |  | 1 " form-type="date" form-value="1" form-prompt="" form-validate="1" form-name="' + $(this).html() + '" type="text" name="a[]">\
                  </label>\
                  <div class="form-check-group">\
                    <input type="text" readonly />\
                  </div>\
                  <i class="close"></i>\
                </div>';
        break;

      case 'interval_date':
        which = '<div class="form-item pattern-added-item form-block date-range" data-type="' + liType + '">\
                  <label>\
                    <span>' + $(this).html() + '</span>：\
                    <input value="interval_date | ' + $(this).html() + ' | 1 |  | 1 " form-type="interval_date" form-value="1" form-prompt="" form-validate="1" form-name="' + $(this).html() + '" type="text" name="a[]">\
                  </label>\
                  <div class="form-check-group">\
                    <input type="text" readonly /><span>-</span><input type="text" readonly />\
                  </div>\
                  <i class="close"></i>\
                </div>';
        break;

      case 'textarea':
        which = '<div class="form-item pattern-added-item form-block" data-type="' + liType + '">\
                  <label>\
                    <span>' + $(this).html() + '</span>：\
                    <input value="interval_date | ' + $(this).html() + ' | 1 |  | " form-type="textarea" form-value="" form-prompt="" form-validate="1" form-name="' + $(this).html() + '" type="text" name="a[]">\
                  </label>\
                  <div class="form-check-group">\
                    <textarea name="" readonly></textarea>\
                  </div>\
                  <i class="close"></i>\
                </div>';
        break;

      case 'images_upload':
        which = '<div class="form-item pattern-added-item form-block attach-block" data-type="' + liType + '">\
                  <label>\
                    <span>' + $(this).html() + '</span>：\
                    <input value="interval_date | ' + $(this).html() + ' | 1 |  | "  form-type="images_upload" form-value="" form-prompt="" form-validate="1" form-name="' + $(this).html() + '" type="text" name="a[]">\
                  </label>\
                  <div class="form-check-group">\
                    <p>支持jpg,png,bmp,psd,tiff等图片格式</p>\
                    <div class="added-img"><img src="images/AJ.jpg" /><i></i></div>\
                    <div class="need-img">\
                      点击选择图片（需小于10M）\
                      <input type="file" readonly />\
                    </div>\
                  </div>\
                  <i class="close"></i>\
                </div>';
        break;

      case 'file_upload':
        which = '<div class="form-item pattern-added-item form-block attach-block" data-type="' + liType + '">\
                  <label>\
                    <span>' + $(this).html() + '</span>：\
                    <input value="interval_date | ' + $(this).html() + ' | 1 |  | " form-type="file_upload" form-value="" form-prompt="" form-validate="1" form-name="' + $(this).html() + '" type="text" name="a[]">\
                  </label>\
                  <div class="form-check-group">\
                    <input type="text" placeholder="上传文件（需小于10M）" readonly /><input type="file" />\
                  </div>\
                  <i class="close"></i>\
                </div>';
        break;
        
      default:
        break;
    }
    $('.pattern-add-wrapper .form-group').append(which)
  });


  // 移除添加的模板
  $(document).on('click', '.close', function (e) {
    e.stopPropagation();
    // 清空右侧模板信息
    removeAll();
    $(this).parents('.pattern-added-item').remove();
    patternIdx = '';
  });

  // 清空第三列模板信息
  function removeAll () {
    $('.title-input').val('').attr('placeholder', '最多20个字');
    $('.verify input').attr('checked', false);
    $('.tip-input').val('').attr('placeholder', '最多20个字');
    $('.choose-add-wrapper').html('');
  }

  // 标题输入时改变标题文字
  $(document).on('input', '.title-input', function (e) {
    if (patternIdx >= 0) {
      $('.pattern-added-item').eq(patternIdx).find('label input').attr('form-name', e.target.value);
      $('.pattern-added-item').eq(patternIdx).find('span').html(e.target.value);
    }
    inputData();
  });

  // 默认提示输入时改变提示文字
  $(document).on('input', '.tip-input', function (e) {
    if (patternIdx >= 0) {
      var lightDom = $('.pattern-added-item').eq(patternIdx).attr('data-type');
      if(lightDom == 'checkbox' || lightDom == 'radio' || lightDom == 'interval_date' || lightDom == 'file_upload' || lightDom == 'images_upload'){
        // 找到隐藏input 添加form_prompt 控件提示信息
        $('.pattern-added-item').eq(patternIdx).find('label input').attr('form-prompt', e.target.value);
      }else if(lightDom == 'textarea'){
        // 找到隐藏input 添加form_prompt 并且添加可显示的placeholder
        $('.pattern-added-item').eq(patternIdx).find('label input').attr('form-prompt', e.target.value);
        $('.pattern-added-item').eq(patternIdx).find('.form-check-group textarea').attr('placeholder', e.target.value);
      }else{
        $('.pattern-added-item').eq(patternIdx).find('label input').attr('form-prompt', e.target.value);
        $('.pattern-added-item').eq(patternIdx).find('.form-check-group input').attr('placeholder', e.target.value);
      }
    }
    inputData();
  });

  // 是否必填
  $('.require').click(function () {
    if (patternIdx >= 0) {
      // 当前点击时即选中了， 即之前为选中， 即第一次点击时为false但是点击时样式变为了选中
      // 控件验证必填2非必填1
      if (!$('.require').prev().is(':checked')) {
        $('.pattern-added-item').eq(patternIdx).find('label input').attr('form-validate', '2');
      } else {
        $('.pattern-added-item').eq(patternIdx).find('label input').attr('form-validate', '1');
      }
    }
    inputData();
  });

  // 选中信息模板 对应右侧模板
  $(document).on('click', '.pattern-added-item', choosenTemplate);
  function choosenTemplate() {
    // 再次点击当前选中不清空右边模板
    if ($(this).attr('class').indexOf('selected') > -1) {
      return false;
    }

    // 清空第三列模板信息
    removeAll();  

    // 移除之前选中 添加当前选中
    $('.pattern-added-item').removeClass('selected');
    $('.pattern-added-item .close').hide();
    $(this).addClass('selected');
    $(this).find('.close').show();

    // 根据index来找到这是第几个添加的信息模板， 删除的会重置索引
    patternIdx = $(this).index();
    var liType = $(this).attr('data-type');
    var liTxtType = ''; // 控件设置对用的被添加模板名称
    var which = ''; // 追加模板的样式
    var isCheck = ''; // 单选-多选框input的文字修改

    // 同步第二列信息到第三列上
    $('.title-input').val($(this).find('label span').html()); // 标题
    if($('.pattern-added-item').eq(patternIdx).find('label input').attr('form-prompt') != undefined){ // 提示
      $('.tip-input').val($('.pattern-added-item').eq(patternIdx).find('label input').attr('form-prompt'));
    }
    if ($('.pattern-added-item').eq(patternIdx).find('label input').attr('form-validate') == 2) { // 必填
      $('.verify input').attr('checked', true);
    } else {
      $('.verify input').attr('checked', false);
    }

    switch (liType) {
      case 'radio':
        liTxtType = '单选框';
        isCheck = 'is-check';
        // 再次点击回来 input数量相同
        var inplen = $(this).find('.form-check-group label').length;
        for (var i = 0; i < inplen; i++) {
          var curTxt = $(this).find('.form-check-group label').eq(i).html();
          which += '<input type="text" value="' + curTxt + '" data-index="' + i + '" />';
        }
        which += '<button class="radio-btn">添加选项</button>';
        break;

      case 'checkbox':
        liTxtType = '多选框';
        isCheck = 'is-check';
        // 再次点击回来 input数量相同
        var inplen = $(this).find('.form-check-group label').length;
        for (var i = 0; i < inplen; i++) {
          var curTxt = $(this).find('.form-check-group label').eq(i).html();
          which += '<input type="text" value="' + curTxt + '" data-index="' + i + '" />';
        }
        which += '<button class="checkbox-btn">添加选项</button>';
        break;

      case 'linkman':
        liTxtType = '联系人';
        which = '<div class="form-check">\
                  <input form-value="1" type="radio" id="contact-only" name="contact" checked />\
                  <label for="contact-only">只能选一人</label>\
                </div>\
                <div class="form-check">\
                  <input form-value="2" type="radio" id="contact-multi" name="contact" />\
                  <label for="contact-multi">可选择多个联系人</label>\
                </div>';
        break;
      case 'department':
        liTxtType = '部门';
        which = '<div class="form-check">\
                  <input form-value="1" type="radio" id="department-only" name="department" checked />\
                  <label for="department-only">只能选一个部门</label>\
                </div>\
                <div class="form-check">\
                  <input form-value="2" type="radio" id="department-multi" name="department" />\
                  <label for="department-multi">可选择多个部门</label>\
                </div>';
        break;

      case 'date':
        liTxtType = '日期';
        which = '<div class="form-check">\
                  <input form-value="1" type="radio" id="day" name="date" checked />\
                  <label for="day">年-月-日</label>\
                </div>\
                <div class="form-check">\
                  <input form-value="2" type="radio" id="seconds" name="date" />\
                  <label for="seconds">年-月-日-时-分</label>\
                </div>';
        break;

      case 'interval_date':
        liTxtType = '日期区间';
        which = '<div class="form-check">\
                  <input form-value="1" type="radio" id="day" name="date" checked />\
                  <label for="day">年-月-日</label>\
                </div>\
                <div class="form-check">\
                  <input form-value="2" type="radio" id="seconds" name="date" />\
                  <label for="seconds">年-月-日-时-分</label>\
                </div>';
        break;

      default:
        break;
    }
    if(which != ''){
      var str = ' <div class="form-item ' + isCheck + '">\
                    <label><span>' + liTxtType + '</span>：</label>\
                    <div class="form-check-group">' + which + '</div>\
                  </div>';
      $('.choose-add-wrapper').html(str);
    }
    
    // 联系人 部门 日期
    if ($(this).find('label input').attr('form-value') == '1') {
      $('.choose-add-wrapper').find('.form-check').eq(0).find('input').attr('checked', true);
      $('.choose-add-wrapper').find('.form-check').eq(1).find('input').attr('checked', false);
    } else if ($(this).find('label input').attr('form-value') == '2') {
      $('.choose-add-wrapper').find('.form-check').eq(0).find('input').attr('checked', false);
      $('.choose-add-wrapper').find('.form-check').eq(1).find('input').attr('checked', true);
    }

  }

  // 选项添加
  $(document).on('click', '.choose-add-wrapper button', function (e) {
    e.preventDefault();
    // button点击之前是第几个
    var inpIdx = $(this).parents('.form-check-group').find('input').length;
    //同步左右添加
    $(this).before('<input type="text" value="选项1" data-index="' + inpIdx + '" />');
    if($(this).attr('class') == 'radio-btn'){
      $('.pattern-added-item.selected').find('.form-check-group').append(
        '<div class="form-check"><input type="radio" data-index="' + inpIdx + '"><label>选项1</label></div>');
    }else if($(this).attr('class') == 'checkbox-btn'){
      $('.pattern-added-item.selected').find('.form-check-group').append(
        '<div class="form-check"><input type="checkbox" data-index="' + inpIdx + '"><label>选项1</label></div>');
    }
    inputData();
  });

  // 改变单、复选框文字
  $(document).on('input', '.is-check input', function (e) {
    if (patternIdx >= 0) {
      // 对应的index
      var compareIdx = $(this).index();
      $('.pattern-added-item').eq(patternIdx).find('.form-check-group label').eq(compareIdx).html(e.target.value);
    }
    inputData();
  });

  // 控件设置点击 一个或者多个的选择
  $(document).on('click', '.choose-add-wrapper .form-check', function (e) {
    var form_value = $(this).find('input').attr('form-value');
    $('.pattern-added-item').eq(patternIdx).find('label input').attr('form-value', form_value);
    inputData();
  });
  // 如上代码会默认执行俩次 因为label有点击获取label 和 input 关联的默认事件
  $(document).on('click', '.choose-add-wrapper .form-check label', function (e) {
    e.stopPropagation();
  });

  function inputData () {
    // form_validate 默认1非必填，2必填
    // form_value 默认'', 1选1人；2选多人；单1，单2；多1，多2 

    var allLen = $('.pattern-added-item').length;

    for(var i = 0; i < allLen; i++){
      var curInput = $('.pattern-added-item').eq(i).find('label>input');

      var type = curInput.attr('form-type');
      var name = curInput.attr('form-name');
      var validate = curInput.attr('form-validate');
      var prompt = curInput.attr('form-prompt');
      var value = curInput.attr('form-value');
      if(type == 'radio' || type == 'checkbox'){
        var inps = $('.pattern-added-item').eq(i).find('.form-check-group label');
        var inpLen = inps.length;
        value = '';
        for(var j = 0; j < inpLen; j++){
          value += inps.eq(j).html() + ',';
        }
        curInput.attr('form-value', value);
      }
      
      var allVal = type + ' | ' + name + ' | ' +  validate + ' | ' + prompt  + ' | ' + value;
      curInput.val(allVal);
      console.log(curInput.val());
    }

  }


  // 预览页面
  $('.preview').click(function (e) {
    e.stopPropagation();

    // 解除预览页面的点击选中事件
    $(document).off('click', '.pattern-added-item', choosenTemplate);

    $('.mask').show();

    // 填充mask表单内容
    var str = $('.control-col .control-pattern').html();
    str += '<div class="form-group mask-btn">\
              <a href="javascript:;" class="btn-a btn-txt-blue hide-preview" style="margin-right: 30px;">取消</a>\
              <input type="submit" href="javascript:;" class="btn-a btn-txt-fff save" value="保存并使用">\
            </div>';
    $('.mask .control-pattern').html(str);

    // 为上面固定的几项在弹窗中赋值显示
    var fixedInpLen = $('.mask .form-inline .fixed-inp').length;
    for(var i = 0; i < fixedInpLen; i++){
      $('.mask .form-inline .fixed-inp').eq(i).val($('.mask .form-inline .fixed-inp').eq(i).attr('data-val'));
    }
    $('.mask .form-inline #start-time').val($('#start-time').val());

    // 赋值带过来的选中和关闭按钮
    $('.pattern-added-item').removeClass('selected');
    $('.pattern-added-item .close').hide();

  });

  // mask内容点击阻止冒泡
  $(document).on('click', '.control-pattern', function (e) {
    e.stopPropagation();
  }); 

  // 取消隐藏mask
  $(document).on('click', '.hide-preview', function () {
    $('.mask').hide();
    $(document).on('click', '.pattern-added-item', choosenTemplate);
  });

  // 为上部固定内容在输入的时候，data-val 便于预览表单时获取数据赋给mask固定的上部val
  $(document).on('input', '.fixed-inp', function (e) {
    $(this).attr('data-val', e.target.value)
  });


  

  // 测试用， 浏览上部表单值
  $(document).on('click', '.mask .save', function (e) {
    var maskInpLen = $('.mask .form-inline .fixed-inp').length;

    e.preventDefault()
    for(var i = 0; i < maskInpLen; i++){
      console.log($('.mask .form-inline .fixed-inp').eq(i).val()) 
    }
  });

});