// Generated by CoffeeScript 1.3.1
(function() {

  define(["smog/server", "smog/notify", "smog/editor", "templates/edit"], function(server, notify, editor, templ) {
    return function(_arg) {
      var edit, name, realname;
      name = _arg.name;
      realname = name.toLowerCase();
      $('#content').append(templ({
        title: 'Insert',
        id: realname
      }));
      edit = editor.create("" + realname + "-edit-view");
      edit.getSession().setUseWrapMode(true);
      edit.getSession().setWrapLimitRange(100, 100);
      edit.getSession().setUseWorker(false);
      edit.getSession().setValue("{\r\n\r\n}");
      $('#edit-modal').modal();
      $('#edit-modal').on('hidden', function() {
        edit.destroy();
        return $('#edit-modal').remove();
      });
      return $('#edit-button').click(function() {
        try {
          return server.collection({
            collection: realname,
            type: 'insert',
            query: edit.getSession().getValue()
          }, function(err) {
            if (err != null) {
              return notify.error("Error inserting document: " + err);
            }
            $('#edit-modal').modal('hide');
            notify.success("Document inserted!");
            return window.location.hash = "#/collection/" + name;
          });
        } catch (err) {
          return notify.error("Invalid JSON: " + err);
        }
      });
    };
  });

}).call(this);
