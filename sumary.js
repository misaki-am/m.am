(function() {
  "use strict";

  let HTMLevents =['app.record.edit.show', 'app.record.detail.show'];
  
   kintone.events.on(HTMLevents, function(event) {
// １ボタンを押す
    var GETbutton = document.createElement('button');
    GETbutton.id = 'asm';
    GETbutton.innerText = 'サマリーの作成';
    GETbutton.className = 'gaia-ui-actionmenu-save';
    GETbutton.onclick = function () {
      const record = event.record;
      var appId = event.appId;
      var recordId = event.recordId;
      
      var body = {
        'app': appId,
        'id': recordId
      };

      kintone.api(kintone.api.url('/k/v1/record', true), 'GET', body, function(resp) {

      kintone.app.record.getSpaceElement('summary').innerHTML = (
        'サマリ情報'+'<br>'+
        '【氏名】'+record['イニシャル']['value']+'<br>'+
        '【年齢】'+record['年齢']['value']+'<br>'+
        '【性別】'+record['性別']['value']+'<br>'+
        '【最寄駅】'+record['最寄駅']['value']+'<br>'+
        '【稼働開始日】'+record['稼働可能日']['value']+'<br>'+
        '【稼働率】'+record['MIN稼働頻度']['value']+'~'+record['MAX稼働頻度']['value']+'<br>'+
        '【希望単金】'+record['MIN単金']['value']+'~'+record['MAX単金']['value']+'<br>'+
        '【並行状況】'+record['並行状況']['value']+'<br>'+
        '【得意案件】'+record['得意案件']['value']+'<br>'+
        '【得意言語】'+record['言語']['value']+'<br>'+
        '【NG案件】'+record['NG案件']['value']+'<br>'+
        '【備考】'+record['個人備考']['value']
       );
               
      }, function(error) {
        // error
        console.log(error);
      });
      
    return event;
      }
    kintone.app.record.getSpaceElement('summary_button').appendChild(GETbutton);
    });

    let events =['app.record.create.submit.success','app.record.edit.submit.success'];
  
    kintone.events.on(events, function(event) {
    const record = event.record;
    var appId = event.appId;
    var recordId = event.recordId;
    let イニシャル　= record['イニシャル']['value'];
    let 年齢= record['年齢']['value'];
    let 性別= record['性別']['value'];
    let 最寄駅= record['最寄駅']['value'];
    let 稼働可能日= record['稼働可能日']['value'];
    let MIN稼働頻度= record['MIN稼働頻度']['value'];
    let MAX稼働頻度= record['MAX稼働頻度']['value'];
    let MIN単金= record['MIN単金']['value'];
    let MAX単金= record['MAX単金']['value'];
    let 並行状況= record['並行状況']['value'];
    let 得意案件= record['得意案件']['value'];
    let 言語= record['言語']['value'];
    let NG案件= record['NG案件']['value'];
    let 個人備考= record['個人備考']['value'];
    
    var body = {
      'app': appId,
      'id': recordId,
      'record': {
        'サマリ_カンバン用': {
          'value':`【名前】${イニシャル}
【年齢】${年齢}
【性別】${性別}
【最寄駅】${最寄駅}
【稼働可能日】${稼働可能日}
【稼働率】${MIN稼働頻度}～${MAX稼働頻度}
【希望単金】${MIN単金}～${MAX単金}
【並行状況】${並行状況}
【得意案件】${得意案件}
【得意言語】${言語}
【NG案件】${NG案件}
【備考】${個人備考}`
        }
      }
    };

      return kintone.api(kintone.api.url('/k/v1/record', true), 'PUT', body).then(function(resp) {
          return event;
      }, function(error) {
          alert(error.message);
          return event;
      });
      
    });
   })();