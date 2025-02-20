import { Router } from "express";
import * as reqPaymentController from '../../controllers/withdrawal.controller'

const reqPaymentRouter = Router()

reqPaymentRouter.post("/" ,reqPaymentController.createReqPaymentController)
reqPaymentRouter.get("/pending",reqPaymentController.findPendingReqPaymentController)
reqPaymentRouter.get("/processing",reqPaymentController.findProcessingReqPaymentController)
reqPaymentRouter.get("/success",reqPaymentController.findSuccessReqPaymentController)
reqPaymentRouter.get("/rejected",reqPaymentController.findRejectedReqPaymentController)
reqPaymentRouter.patch("/processing/:id", reqPaymentController.updateStatusToProcessingReqPaymentController)
reqPaymentRouter.patch("/rejected/:id", reqPaymentController.updateStatusToRejectedReqPaymentController)
reqPaymentRouter.patch("/success/:id", reqPaymentController.updateStatusToSuccessReqPaymentController)
reqPaymentRouter.get('/search-pending', reqPaymentController.searchPendingReqPaymentsController)
reqPaymentRouter.get('/search-processing', reqPaymentController.searchProcessingReqPaymentsController)
reqPaymentRouter.get('/search-success', reqPaymentController.searchSuccessReqPaymentsController)
reqPaymentRouter.get('/search-rejected', reqPaymentController.searchRejectedReqPaymentsController)

export default reqPaymentRouter