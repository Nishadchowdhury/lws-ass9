const express = require('express');
// const { getAllTools, PostATool } = require('../../controllers/tools_Controller'); // inefficient way
const toolsController = require('../../controllers/tools_Controller');
const limiter = require('../../middleware/limiter');
const viewCount = require('../../middleware/viewCount');

const router = express.Router();



router
    .route('/all')


    /** for get route
     
     *  @api {get} / tools all tools
     *  @apiDescription get all the tools
     *  @apiPermission anyone
     
     *  @apiHeader {String} Authorization   User's access token
     
     *  @apiParam  {Number{1-}}         [page=1]     List page
     *  @apiParam  {Number{1-100}}      [limit=10]  Users per page
     
     *  @apiSuccess {Object[]} all the tools.
     
     *  @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
     *  @apiError (Forbidden 403)     Forbidden     Only admins can access the data   
     
    */
    .get(toolsController.all)

/** for post route
 
 *  @api {post} /tools add a tool
 *  @apiDescription Post a tool
 *  @apiPermission anyone

 *  @apiHeader {String} Authorization   User's access token

 *  @apiSuccess {Object[]} one of all data.
 
 *  @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
 *  @apiError (Forbidden 403)     Forbidden     Only admins can access the data
 
*/


router.route('/random').get(toolsController.random);


router.route('/save')
    .post(toolsController.save)


router.route('/update')
    .patch(toolsController.update)


router.route('/bulk_Update')
    .patch(toolsController.bulk_Update)




router.route('/delete')
    .delete(toolsController.delete)






module.exports = router;
