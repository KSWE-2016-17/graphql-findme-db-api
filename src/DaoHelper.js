var q = require("q");

var DaoHelper = function() {};

DaoHelper.prototype.find = function(dest) {
    var defer = q.defer();

    if (typeof $ === "function" && typeof $.ajax === "function") {
        $.ajax({
            url: dest,
            type: "GET",
            contentType: "application/json"
        }).success(function(data, textStatus, jqXHR) {
            var jsonResponse = JSON.parse(data);
            var rows = [];
            for (var index = 0; index < jsonResponse.rows.length; index++) {
                rows.push(jsonResponse.rows[index].value);
            }
            defer.resolve(rows);
        }).error(function(jqXHR, textStatus, errorThrown) {
            defer.reject(errorThrown);
        });
    } else {
        fetch(dest, {
            method: "GET",
            mode: "cors",
            headers: new Headers({
                "Content-Type": "application/json"
            })
        }).then(function(response) {
            return response.json();
        }).then(function(jsonResponse) {
            var rows = [];
            for (var index = 0; index < jsonResponse.rows.length; index++) {
                rows.push(jsonResponse.rows[index].value);
            }
            defer.resolve(rows);
        }).catch(function(err) {
            defer.reject(err);
        });
    }

    return defer.promise;
};

DaoHelper.prototype.create = function(obj, dest) {
    var defer = q.defer();

    if (typeof $ === "function" && typeof $.ajax === "function") {
        $.ajax({
            url: dest,
            /*
             * If POST method doesn't work properly, try PUT method instead as
             * stated here: https://wiki.apache.org/couchdb/HTTP_Document_API#POST
             */
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(obj)
        }).success(function(data, textStatus, jqXHR) {
            defer.resolve(JSON.parse(data));
        }).error(function(jqXHR, textStatus, errorThrown) {
            defer.reject(errorThrown);
        });
    } else {
        fetch(dest, {
            /*
             * If POST method doesn't work properly, try PUT method instead as
             * stated here: https://wiki.apache.org/couchdb/HTTP_Document_API#POST
             */
            method: "POST",
            mode: "cors",
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(obj)
        }).then(function(response) {
            return response.json();
        }).then(function(jsonResponse) {
            defer.resolve(jsonResponse)
        }).catch(function(err) {
            defer.reject(err);
        });
    }

    return defer.promise;
};

DaoHelper.prototype.update = function(obj, dest) {
    var defer = q.defer();

    if (typeof $ === "function" && typeof $.ajax === "function") {
        $.ajax({
            url: dest,
            type: "PUT",
            contentType: "application/json",
            data: JSON.stringify(obj)
        }).success(function(data, textStatus, jqXHR) {
            defer.resolve(JSON.parse(data));
        }).error(function(jqXHR, textStatus, errorThrown) {
            defer.reject(errorThrown);
        });
    } else {
        fetch(dest, {
            method: "PUT",
            mode: "cors",
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(obj)
        }).then(function(response) {
            return response.json();
        }).then(function(jsonResponse) {
            defer.resolve(jsonResponse);
        }).catch(function(err) {
            defer.reject(err);
        });
    }

    return defer.promise;
};

DaoHelper.prototype.delete = function(obj, dest) {
    var defer = q.defer();

    if (typeof $ === "function" && typeof $.ajax === "function") {
        $.ajax({
            url: dest,
            type: "DELETE",
            contentType: "application/json"
        }).success(function(data, textStatus, jqXHR) {
            defer.resolve(JSON.parse(data));
        }).error(function(jqXHR, textStatus, errorThrown) {
            defer.reject(errorThrown);
        });
    } else {
        fetch(dest, {
            method: "DELETE",
            mode: "cors",
            headers: new Headers({
                "Content-Type": "application/json"
            })
        }).then(function(response) {
            return response.json();
        }).then(function(jsonResponse) {
            defer.resolve(jsonResponse);
        }).catch(function(err) {
            defer.reject(err);
        });
    }

    return defer.promise;
};

exports.default = DaoHelper;
module.exports = exports.default;
