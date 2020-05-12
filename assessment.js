'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');


/**
 * 指定した要素の子供を全て削除する
 * @param{HTMLElement} element HTMLの要素
 */
function removeALLChildren(element) {
    while (element.firstChild) {
         //子供の要素がある限り削除
        element.removeChild(element.firstChild);

        }
    }


assessmentButton.onclick  =  () => {
    //アローが代わりになるのは、？？？＝function（）｛｝ の時のみ
     const username = userNameInput.value;
     if (username.length === 0) {
         ///名前が空の時は処理を終了する
         return;
     }

     //診断結果表示エリアの作成
     removeALLChildren(resultDivided);
     const header = document.createElement('h3');
     header.innerText = '診断結果';
     resultDivided.appendChild(header);
 
     const paragraph = document.createElement('p')
     const result = assessment(username);
     paragraph.innerText = result;
     resultDivided.appendChild(paragraph)
    //TODO ツイートエリアの作成
    removeALLChildren(tweetDivided)
    const anchor = document.createElement('a');
    //urlの作成
    const hrefValue =
       'https://twitter.com/intent/tweet?button_hashtag=' + encodeURIComponent('あなたのいいところ') + '&ref_src=twsrc%5Etfw';

    anchor.setAttribute('href', hrefValue);
    //setAttributeは｛属性=(,)属性に入れるもの｝
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('date-text', '診断結果の文章');
    anchor.innerText ='Tweet #あなたのいいところ';

    //createElementで要素を得て　その要素を使用するのがappendChild
    tweetDivided.appendChild(anchor);

　　// widgets.jsの設定
　　const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
};

userNameInput.onkeydown = event => {
    if (event.key === 'Enter') {
        assessmentButton.onclick();
     }
}



let answers = [
'{username}のいいところは声です。{username}の特徴的な声は皆を惹きつけ、心に残ります。',
'{username}のいいところは眼差しです。{username}に見つめられた人は、気になって仕方ないでしょう。',
'{username}のいいところは情熱です。{username}の情熱に周りの人は感化されます。',
'{username}のいいところは厳しさです。{username}の厳しさがものごとをいつも成功に導きます。',
'{username}のいいところは知識です。博識な{username}を多くの人が頼りにしてます。',
'{username}のいいところはユニークさです。{username}だけのその特徴が皆を楽しくさせます。',
'{username}のいいところは用心深さです。{username}の洞察に、多くの人がたすけられます。',
'{username}のいいところは見た目です。内側から溢れ出る{username}の良さに皆が惹かれます。',
'{username}のいいところはで決断力です。{username}がする決断にいつも助けられる人がいます。',
'{username}のいいところは思いやりです。{username}に気をかけてもらった多くの人が感謝しています。',
'{username}のいいところは感受性です。{username}が感じたことに皆が共感し、わかりあうことができます。',
'{username}のいいところは節度です。強引すぎない{username}の考えに皆が感謝しています。',
'{username}のいいところは好奇心です。新しいことに向かっていく{username}の心構えが多くの人に魅力的に移ります。',
'{username}のいいところは気配りです。{username}配慮が多くの人を救っています。',
'{username}のいいところはその全てです。ありのままの{username}自身がいいところなのです。',
'{username}のいいところはです自制心です。やばいと思ったときにしっかりと衝動を抑えられる{username}が皆から評価されます。',
'{username}のいいところは優しさです。{username}の優しい雰囲気や立ち振る舞いに多くの人が癒やされています。
];

function assessment (username){
    //全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0;
    for (let i = 0; i < username.length; i++) {
        sumOfCharCode = sumOfCharCode + username.charCodeAt(i);
    }

    //文字のコード番号の合計を回答の数で割って添字似数値を求める
    const index = sumOfCharCode % answers.length;
    let result =answers[index];
    result = result.replace(/\{username\}/g, username);
    //　「/g」は複数選択の意味、「\記号」は\の後ろの正規表現記号をダダの文字としてあつかうためある。
    return result;
}
