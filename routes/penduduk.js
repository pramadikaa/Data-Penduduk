var express = require('express');
var router = express.Router();
/* var authentication_mdl = require('../middlewares/authentication'); */
var session_store;
/* GET penduduk page. */
router.get('/',/* authentication_mdl.is_login, */ function(req, res, next) {
    req.getConnection(function(err,connection){
        var query = connection.query('SELECT * FROM penduduk',function(err,rows)
        {
            if(err)
            var errornya = ("Error Selecting : %s ",err );
            req.flash('msg_error', errornya);
            res.render('penduduk/list',{title:"penduduk",data:rows,session_store:
            req.session});
        });
    //console.log(query.sql);
    });
 });
module.exports = router;
router.post('/add', /* authentication_mdl.is_login, */ function(req, res, next)
{
    req.assert('nama', 'Please fill the nama').notEmpty();
    var errors = req.validationErrors();
    if (!errors) {
                    v_nama = req.sanitize( 'nama' ).escape().trim();
                    v_alamat = req.sanitize( 'alamat' ).escape().trim();
                    v_jk = req.sanitize( 'jk' ).escape().trim();
                    v_umur = req.sanitize( 'umur' ).escape();
    var penduduk = {
                    nama: v_nama,
                    alamat: v_alamat, 
                    jk: v_jk,
                    umur : v_umur
                    }
    var insert_sql = 'INSERT INTO penduduk SET ?';
    req.getConnection(function(err,connection){
    var query = connection.query(insert_sql, penduduk, function(err, result){
    if(err)
    {
        var errors_detail = ("Error Insert : %s ",err );
        req.flash('msg_error', errors_detail);
        res.render('penduduk/add-penduduk',
    {
        nama: req.param('nama'),
        alamat: req.param('alamat'),
        jk: req.param('jk'),
        umur: req.param('umur'),
    });
    }else{
            req.flash('msg_info', 'Create penduduk success');
            res.redirect('/penduduk');
            }
    });
    });
 }else{
 console.log(errors);
 errors_detail = "Sory there are error <ul>";
 for (i in errors)
 {
 error = errors[i];
 errors_detail += '<li>'+error.msg+'</li>';
 }
 errors_detail += "</ul>";
 req.flash('msg_error', errors_detail);
 res.render('penduduk/add-penduduk',
 {
 nama: req.param('nama'),
 alamat: req.param('alamat')
 });
 }
});
router.get('/add', function(req, res, next) {
9
 res.render( 'penduduk/add-penduduk',
 {
 title: 'Add New penduduk',
 nama: '',
 jk: '',
 umur:'',
 alamat:''
 });
});
router.get('/edit/(:id)', /* authentication_mdl.is_login,  */function(req,res,next){
 req.getConnection(function(err,connection){
 var query = connection.query('SELECT * FROM penduduk where id='+req.params.id,function(err,rows)
 {
 if(err)
 {
 var errornya = ("Error Selecting : %s ",err );
 req.flash('msg_error', errors_detail);
 res.redirect('/penduduk');
 }else
 {
 if(rows.length <=0)
 {
 req.flash('msg_error', "penduduk can't be find!");
 res.redirect('/penduduk');
 }
 else
 {
 console.log(rows);
 res.render('penduduk/edit',{title:"Edit ",data:rows[0]});

 }
 }

 });
 });
 });
 router.put('/edit/(:id)', /* authentication_mdl.is_login,  */function(req,res
,next){
 req.assert('nama', 'Please fill the nama').notEmpty();
 var errors = req.validationErrors();
 if (!errors) {
10
 v_nama = req.sanitize( 'nama' ).escape().trim();
 v_jk = req.sanitize( 'jk' ).escape().trim();
 v_alamat = req.sanitize( 'alamat' ).escape().trim();
 v_umur = req.sanitize( 'umur' ).escape();

 var penduduk = {
 nama: v_nama,
 alamat: v_alamat,
 jk: v_jk,
 umur : v_umur
 }

 var update_sql = 'update penduduk SET ? where id = '+req.params.id;
 req.getConnection(function(err,connection){
 var query = connection.query(update_sql, penduduk, function(err, result){
 if(err)
 {
 var errors_detail = ("Error Update : %s ",err );
 req.flash('msg_error', errors_detail);
 res.render('penduduk/edit',
 {
 nama: req.param('nama'),
 alamat: req.param('alamat'),
 jk: req.param('jk'),
 umur: req.param('umur'),
 });
 }else{
 req.flash('msg_info', 'Update penduduk success');
 res.redirect('/penduduk/edit/'+req.params.id);
 }
 });
 });
 }else{
 console.log(errors);
 errors_detail = "Sory there are error<ul>";
 for (i in errors)
 {
 error = errors[i];
 errors_detail += '<li>'+error.msg+'</li>';
 }
 errors_detail += "</ul>";
 req.flash('msg_error', errors_detail);
 res.render('penduduk/add-penduduk',
 {
 nama: req.param('nama'),
 alamat: req.param('alamat')
 });
 }
 });
 router.delete('/delete/(:id)',/* authentication_mdl.is_login,  */function(req
, res, next) {
 req.getConnection(function(err,connection){
 var penduduk = {
 id: req.params.id,
 }

 var delete_sql = 'delete from penduduk where ?';
 req.getConnection(function(err,connection){
 var query = connection.query(delete_sql, penduduk, function(err, result){
 if(err)
 {
 var errors_detail = ("Error Delete : %s ",err);
 req.flash('msg_error', errors_detail);
 res.redirect('/penduduk');
 }
 else{
 req.flash('msg_info', 'Delete penduduk Success');
 res.redirect('/penduduk');
 }
 });
 });
 });
});