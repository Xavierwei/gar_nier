<!-- friend list template -->
<script type="text/x-handlebars-template" id="friend_item_weibo">
    {{#if users}}
    {{#each users}}
    <li>
        <div class="avatar"><img src="{{profile_image_url}}" width="30" height="30" /></div>
        <div class="name">{{screen_name}}</div>
    </li>
    {{/each}}
    {{/if}}
</script>

<script type="text/x-handlebars-template" id="friend_item_renren">
    {{#if data}}
    {{#each data}}
    <li>
        <div class="avatar"><img src="{{avatar.0.url}}" width="30" height="30" /></div>
        <div class="name">{{name}}</div>
    </li>
    {{/each}}
    {{/if}}
</script>

<script type="text/x-handlebars-template" id="friend_item_tencent">
    {{#if info}}
    {{#each info}}
    <li>
        <div class="avatar"><img src="{{headurl}}/30" width="30" height="30" /></div>
        <div class="name">{{name}}</div>
    </li>
    {{/each}}
    {{/if}}
</script>

<script type="text/x-handlebars-template" id="friend_item_qq">
    {{#if info}}
    {{#each info}}
    <li>
        <div class="avatar"><img src="{{head}}/30" width="30" height="30" /></div>
        <div class="name">{{name}}</div>
    </li>
    {{/each}}
    {{/if}}
</script>



<!-- photo item template -->
<script type="text/x-handlebars-template" id="photowall_item">
    {{#if data}}
    {{#each data}}
    <div class="pho_item" data-id="{{photo_id}}" data-uid="{{user_id}}">
        {{#if nickname}}
        <div class="pho_name">{{nickname}}</div>
        {{else}}
        <div class="pho_name">游客</div>
        {{/if}}
        <div class="pho_time">{{datetime}}</div>
        <div class="pho_img"><img src="web{{path}}" width="177" /></div>
        <div class="pho_vote cs-clear">
            <div class="pho_votenum"><div class="pho_vote_hover"></div><span>{{vote}}</span> 票</div>
            <span class="pho_votebtn">投票</span>
        </div>
    </div>
    {{/each}}
    {{/if}}
</script>

<!-- fullscreen photo template -->
<script type="text/x-handlebars-template" id="photowall_fullscreen">
    <div class="pho_picCon" data-id="{{photo_id}}">
        <img class="pho_picImg" src="{{path}}" width="auto" />
        <div class="pho_pic_inro">
            <a href="#" class="phoPic_close"></a>
            <div class="pho_name">{{nickname}}</div>
            <div class="pho_time">{{datetime}}</div>
            <div class="pho_votenum"><span>{{vote}}</span> 票</div>
            <a href="#" class="phoPic_vote"><img src="i/phoPic_vote.png" /></a>
            <a href="#" class="phoPic_share"><img src="i/phoPic_share.png" /></a>
            <div class="phoPic_voted_text"><img src="i/text_phoPic_voted.png" /><span class="ie6text">恭喜你 投票成功</span></div>
            <a href="#" class="phoPic_n"></a>
            <a href="#" class="phoPic_p"></a>
            <div class="keytips">可以使用键盘方向键切换图片</div>
        </div>
        <div class="cs-clear"></div>
    </div>
</script>

