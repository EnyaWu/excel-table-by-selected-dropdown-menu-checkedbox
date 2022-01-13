function clearAll() {
  var inputs = document.querySelectorAll('.bi') // 確認打勾項目
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].checked = false;
  }
}

function checkAll() {
  var inputs = document.querySelectorAll('.bi') // 確認打勾項目
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].checked = true;
  }
}

function clearTable() {
  $('#showFilter').empty()
}
var excel_file_API = './Test.xlsx';
//var excel_file_API = './Reviews.xlsx';
// Do some stuff when page hmtl page is launched
$(document).ready(function() {

  $("#headerTitle").hide(300).show(1500);

  // read Excel file and convert to json format using fetch
  //fetch('./Reviews.xlsx').then(function (res) {
  fetch('./Test.xlsx').then(function(res) {

      /* get the data as a Blob */
      if (!res.ok) throw new Error("fetch failed");
      return res.arrayBuffer();
    })
    .then(function(ab) {
      /* parse the data when it is received */
      var data = new Uint8Array(ab);
      var workbook = XLSX.read(data, {
        type: "array"
      });

      /* *****************************************************************
       * DO SOMETHING WITH workbook: Converting Excel value to Json       *
       ********************************************************************/
      var first_sheet_name = workbook.SheetNames[0];
      /* Get worksheet */
      var worksheet = workbook.Sheets[first_sheet_name];

      var _JsonData = XLSX.utils.sheet_to_json(worksheet, {
        raw: true
      });
      /************************ End of conversion ************************/

      console.log(_JsonData);
      $('#ok').click(function() {
        var selected_time_limit = $('#time_limit').val();
        var selected_payment = $('#payment').val();
        var selected_reservation = $('#reservation').val();
        var selectedRate = $('#try').val();
        var selected_order = $('#order').val();
        var selected_wifi = document.getElementById('wifi').checked;
        //var selected_guide = document.getElementById('guide').checked;
        /*
        做篩選寫if-else
        */
        var returnedData = $.grep(_JsonData, function(element, index) {
          if (!selected_wifi) {
            //console.log(element['Google 星等']);
            return element['Google 星等'] >= selectedRate;
          } else {
            return element['Google 星等'] >= selectedRate && element['有Wifi'] == 1;
          }
        });
        /*
        排序
        */
        returnedData.sort(function(a, b) {
          //alert(selected_order);
          if (selected_order == 4) {
            return b['Google 星等'] - a['Google 星等'];
          } else if (selected_order == 3) {
            console.log(returnedData);
            return b['Whole score'] - a['Whole score'];
          } else if (selected_order == 2) {
            return b['wifi'] - a['wifi'];
          } else if (selected_order == 1) {
            return b['等待'] - a['等待'];
          }

        });

        //console.log(returnedData);
        if ($('#showFilter tr').length == 0) {
          jQuery.each(returnedData, function(index, value) {
            $('#showFilter').append(
              '<tr>' +
              '<th scope="row">' +
              value['咖啡店名'] +
              '</th>' +
              '<td>' +
              value['Google 星等'] +
              '</td>' +
              '<td>' +
              value['Whole score'] +
              '</td>' +
              '<td>' +
              value['安靜'] +
              '</td>' +
              '<td>' +
              value['空間'] +
              '</td>' +
              '<td>' +
              value['衛生'] +
              '</td>' +
              '<td>' +
              value['服務'] +
              '</td>' +
              '<td>' +
              value['態度'] +
              '</td>' +
              '<td>' +
              value['光線'] +
              '</td>' +
              '<td>' +
              value['等待'] +
              '</td>' +
              '<td>' +
              value['wifi'] +
              '</td>' +

              '</tr>'
            );
          })
        } else {
          clearTable();
          jQuery.each(returnedData, function(index, value) {
            $('#showFilter').append(
              '<tr>' +
              '<th scope="row">' +
              value['咖啡店名'] +
              '</th>' +
              '<td>' +
              value['Google 星等'] +
              '</td>' +
              '<td>' +
              value['Whole score'] +
              '</td>' +
              '<td>' +
              value['安靜'] +
              '</td>' +
              '<td>' +
              value['空間'] +
              '</td>' +
              '<td>' +
              value['衛生'] +
              '</td>' +
              '<td>' +
              value['服務'] +
              '</td>' +
              '<td>' +
              value['態度'] +
              '</td>' +
              '<td>' +
              value['光線'] +
              '</td>' +
              '<td>' +
              value['等待'] +
              '</td>' +
              '<td>' +
              value['wifi'] +
              '</td>' +

              '</tr>'
            );
          })

        }

        //這裡開始是測試
        /*
        $('#ok').click(function() {
            var selected_time_limit = $('#time_limit').val();
            var selected_payment = $('#payment').val();
            var selected_reservation = $('#reservation').val();
            var selectedRate = $('#try').val();
            var selected_guide = document.getElementById('guide').checked;
            var returnedData = $.grep(_JsonData, function (element, index) {
                if(!selected_guide) {
                    return element.rate >= selectedRate;
                }
                else {
                    return element.rate >= selectedRate && element.role === "Y";
                }
            });
            //console.log(returnedData);
            if($('#showFilter tr').length == 0){
                jQuery.each(returnedData, function(index, value) {
                    $('#showFilter').append(
                        '<tr>' +
                            '<th scope="row">' +
                                value['rate'] +
                            '</th>' + 
                            '<td>' +
                                value['time'] +
                            '</td>' +
                            '<td>' +
                                    value['text'] +
                            '</td>' +
                            '<td>' +
                                value['role'] +
                            '</td>' +
                        '</tr>'
                        );
                })
            } else {
                clearTable();
                jQuery.each(returnedData, function(index, value) {
                    $('#showFilter').append(
                        '<tr>' +
                            '<th scope="row">' +
                                value['rate'] +
                            '</th>' + 
                            '<td>' +
                                value['time'] +
                            '</td>' +
                            '<td>' +
                                    value['text'] +
                            '</td>' +
                            '<td>' +
                                value['role'] +
                            '</td>' +
                        '</tr>'
                        );
                })

            }
*/
        /*
                    jQuery.each(_JsonData, function(index, value) {
                        
                        if(value['rate'] >= selectedRate) {
                            $('#showFilter').append(
                                '<tr>' +
                                    '<th scope="row">' +
                                        value['rate'] +
                                    '</th>' + 
                                    '<td>' +
                                        value['time'] +
                                    '</td>' +
                                    '<td>' +
                                            value['text'] +
                                    '</td>' +
                                    '<td>' +
                                        value['role'] +
                                    '</td>' +
                                '</tr>'
                                );
                        }
                    })
                    */
      });

      //測試結束



      // 所有資料

      /*
      $.each(_JsonData, function (index, value) {


          $('#showExcel').append(

              '<tr>' +
                  '<th scope="row">' +
                      value['rate'] +
                  '</th>' + 
                  '<td>' +
                      value['time'] +
                  '</td>' +  
                  '<td>' +
                          value['text'] +
                  '</td>' +
                  '<td>' +
                      value['role'] +
                  '</td>' +
              '</tr>'
          );

      });
      */

    });


}); // end: document.ready()
