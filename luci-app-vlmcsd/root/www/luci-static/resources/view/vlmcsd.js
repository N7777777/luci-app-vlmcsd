'use strict';
'require form';
'require poll';
'require view';
'require fs';
'require rpc';

var callServiceList = rpc.declare({
    object: 'service',
    method: 'list',
    params: ['name'],
    expect: { }
});

function getServiceStatus() {
    return callServiceList('vlmcsd').then(function(res) {
        var running = false;
        if (res && res.vlmcsd && res.vlmcsd.instances) {
            for (var k in res.vlmcsd.instances) {
                if (res.vlmcsd.instances[k].running) {
                    running = true;
                    break;
                }
            }
        }
        return running;
    }).catch(function() { return false; });
}

function renderStatus(status) {
    var color = status ? 'green' : 'red';
    var text = status ? 'KMS 服务运行中' : 'KMS 服务器 未运行';
    return '<em><span style="color:' + color + '"><strong>' + text + '</strong></span></em>';
}

return view.extend({
    render: function() {
        var m = new form.Map('vlmcsd', 'KMS 服务器设置');
        var s = m.section(form.TypedSection);
        s.anonymous = true;
        s.render = function() {
            poll.add(function() {
                return L.resolveDefault(getServiceStatus(), false).then(function(res) {
                    var view = document.getElementById('vlmcsd_status');
                    if (view) view.innerHTML = renderStatus(res);
                });
            });
            return E('div', { class: 'cbi-section', id: 'status_bar' }, [
                E('p', { id: 'vlmcsd_status' }, '正在收集数据...')
            ]);
        };

        s = m.section(form.NamedSection, 'config', 'vlmcsd');
        s.tab('general', '基本设置');
        s.tab('config_file', '配置文件');

        var o = s.taboption('general', form.Flag, 'enabled', '启用 KMS 服务器');
        o.default = o.enabled;
        o.rmempty = false;

        o = s.taboption('general', form.Flag, 'auto_activate', '自动激活局域网客户端');
        o.default = o.enabled;

        o = s.taboption('general', form.Flag, 'internet_access', '允许来自互联网的连接');
        o.default = o.enabled;

        o = s.taboption('config_file', form.TextValue, '_tmpl', null,
            '这是 /etc/vlmcsd.ini 文件的内容，通常不需要修改。');
        o.rows = 20;
        o.monospace = true;
        o.load = function() { return fs.trimmed('/etc/vlmcsd.ini'); };
        o.write = function(_, value) {
            return fs.write('/etc/vlmcsd.ini', value.trim().replace(/\r\n/g, '\n') + '\n');
        };

        return m.render();
    }
});
