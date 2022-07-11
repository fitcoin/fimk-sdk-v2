"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ARBITRARY_MESSAGE = exports.ORDINARY_PAYMENT = exports.DigitalGoodsPurchaseAttachement = exports.AccountControlEffectiveBalanceLeasing = exports.ColoredCoinsBidOrderCancellation = exports.ColoredCoinsAskOrderCancellation = exports.ColoredCoinsOrderCancellation = exports.ColoredCoinsBidOrderPlacement = exports.ColoredCoinsAskOrderPlacement = exports.ColoredCoinsOrderPlacement = exports.AssetTransfer = exports.AssetBase = exports.Message = exports.Payment = exports.EmptyAttachment = void 0;
/**
 * The MIT License (MIT)
 * Copyright (c) 2020 heatcrypto.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * */
var appendix_1 = require("./appendix");
var transaction_type_1 = require("./transaction-type");
var fee_1 = require("./fee");
var long_1 = __importDefault(require("long"));
var EmptyAttachment = /** @class */ (function (_super) {
    __extends(EmptyAttachment, _super);
    function EmptyAttachment() {
        var _this = _super.call(this) || this;
        _this.version = 0;
        return _this;
    }
    EmptyAttachment.prototype.parse = function (buffer) {
        return this;
    };
    EmptyAttachment.prototype.getSize = function () {
        return this.getMySize();
    };
    EmptyAttachment.prototype.putBytes = function (buffer) { };
    EmptyAttachment.prototype.putMyBytes = function (buffer) { };
    EmptyAttachment.prototype.putMyJSON = function (json) { };
    EmptyAttachment.prototype.getMySize = function () {
        return 0;
    };
    return EmptyAttachment;
}(appendix_1.AbstractAppendix));
exports.EmptyAttachment = EmptyAttachment;
var Payment = /** @class */ (function (_super) {
    __extends(Payment, _super);
    function Payment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Payment.prototype.getFee = function () {
        return fee_1.Fee.DEFAULT;
    };
    Payment.prototype.getAppendixName = function () {
        return "OrdinaryPayment";
    };
    Payment.prototype.getTransactionType = function () {
        return transaction_type_1.ORDINARY_PAYMENT_TRANSACTION_TYPE;
    };
    return Payment;
}(EmptyAttachment));
exports.Payment = Payment;
var Message = /** @class */ (function (_super) {
    __extends(Message, _super);
    function Message() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message.prototype.getFee = function () {
        return fee_1.Fee.DEFAULT;
    };
    Message.prototype.getAppendixName = function () {
        return "ArbitraryMessage";
    };
    Message.prototype.getTransactionType = function () {
        return transaction_type_1.ARBITRARY_MESSAGE_TRANSACTION_TYPE;
    };
    return Message;
}(EmptyAttachment));
exports.Message = Message;
var AssetBase = /** @class */ (function (_super) {
    __extends(AssetBase, _super);
    function AssetBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AssetBase.prototype.init = function (assetId, quantity) {
        this.assetId = long_1.default.fromString(assetId, true);
        this.quantity = long_1.default.fromString(quantity);
        return this;
    };
    AssetBase.prototype.getMySize = function () {
        return 8 + 8 + 2;
    };
    AssetBase.prototype.parse = function (buffer) {
        _super.prototype.parse.call(this, buffer);
        this.assetId = buffer.readInt64();
        this.quantity = buffer.readInt64();
        return this;
    };
    AssetBase.prototype.putMyBytes = function (buffer) {
        buffer.writeInt64(this.assetId);
        buffer.writeInt64(this.quantity);
    };
    AssetBase.prototype.putMyJSON = function (json) {
        json["asset"] = this.assetId.toUnsigned().toString();
        json["quantity"] = this.quantity.toString();
    };
    AssetBase.prototype.parseJSON = function (json) {
        _super.prototype.parseJSON.call(this, json);
        this.assetId = long_1.default.fromString(json["asset"], true);
        this.quantity = long_1.default.fromString(json["quantity"]);
        return this;
    };
    AssetBase.prototype.getAssetId = function () {
        return this.assetId;
    };
    AssetBase.prototype.getQuantity = function () {
        return this.quantity;
    };
    return AssetBase;
}(appendix_1.AbstractAppendix));
exports.AssetBase = AssetBase;
var AssetTransfer = /** @class */ (function (_super) {
    __extends(AssetTransfer, _super);
    function AssetTransfer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AssetTransfer.prototype.getFee = function () {
        return fee_1.Fee.ASSET_TRANSFER_FEE;
    };
    AssetTransfer.prototype.getAppendixName = function () {
        return "AssetTransfer";
    };
    AssetTransfer.prototype.getTransactionType = function () {
        return transaction_type_1.COLORED_COINS_ASSET_TRANSFER_TRANSACTION_TYPE;
    };
    return AssetTransfer;
}(AssetBase));
exports.AssetTransfer = AssetTransfer;
var ColoredCoinsOrderPlacement = /** @class */ (function (_super) {
    __extends(ColoredCoinsOrderPlacement, _super);
    function ColoredCoinsOrderPlacement() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColoredCoinsOrderPlacement.prototype.init = function (currencyId, assetId, quantity, price, expiration) {
        this.currencyId = long_1.default.fromString(currencyId);
        this.assetId = long_1.default.fromString(assetId);
        this.quantity = long_1.default.fromString(quantity);
        this.price = long_1.default.fromString(price);
        this.expiration = expiration;
        return this;
    };
    ColoredCoinsOrderPlacement.prototype.getMySize = function () {
        return 8 + 8 + 8 + 8 + 4;
    };
    ColoredCoinsOrderPlacement.prototype.putMyBytes = function (buffer) {
        buffer.writeInt64(this.currencyId);
        buffer.writeInt64(this.assetId);
        buffer.writeInt64(this.quantity);
        buffer.writeInt64(this.price);
        buffer.writeInt32(this.expiration);
    };
    ColoredCoinsOrderPlacement.prototype.parse = function (buffer) {
        _super.prototype.parse.call(this, buffer);
        this.currencyId = buffer.readInt64();
        this.assetId = buffer.readInt64();
        this.quantity = buffer.readInt64();
        this.price = buffer.readInt64();
        this.expiration = buffer.readInt32();
        return this;
    };
    ColoredCoinsOrderPlacement.prototype.putMyJSON = function (json) {
        json["currency"] = this.currencyId.toUnsigned().toString();
        json["asset"] = this.assetId.toUnsigned().toString();
        json["quantity"] = this.quantity.toString();
        json["price"] = this.price.toString();
        json["expiration"] = this.expiration.toString();
    };
    ColoredCoinsOrderPlacement.prototype.parseJSON = function (json) {
        _super.prototype.parseJSON.call(this, json);
        this.currencyId = long_1.default.fromString(json["currency"], true);
        this.assetId = long_1.default.fromString(json["asset"], true);
        this.quantity = long_1.default.fromString(json["quantity"]);
        this.price = long_1.default.fromString(json["price"]);
        this.expiration = json["expiration"];
        return this;
    };
    ColoredCoinsOrderPlacement.prototype.getFee = function () {
        return fee_1.Fee.ORDER_PLACEMENT_FEE;
    };
    ColoredCoinsOrderPlacement.prototype.getCurrencyId = function () {
        return this.currencyId;
    };
    ColoredCoinsOrderPlacement.prototype.getAssetId = function () {
        return this.assetId;
    };
    ColoredCoinsOrderPlacement.prototype.getQuantity = function () {
        return this.quantity;
    };
    ColoredCoinsOrderPlacement.prototype.getPrice = function () {
        return this.price;
    };
    ColoredCoinsOrderPlacement.prototype.getExpiration = function () {
        return this.expiration;
    };
    return ColoredCoinsOrderPlacement;
}(appendix_1.AbstractAppendix));
exports.ColoredCoinsOrderPlacement = ColoredCoinsOrderPlacement;
var ColoredCoinsAskOrderPlacement = /** @class */ (function (_super) {
    __extends(ColoredCoinsAskOrderPlacement, _super);
    function ColoredCoinsAskOrderPlacement() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColoredCoinsAskOrderPlacement.prototype.getAppendixName = function () {
        return "AskOrderPlacement";
    };
    ColoredCoinsAskOrderPlacement.prototype.getTransactionType = function () {
        return transaction_type_1.COLORED_COINS_ASK_ORDER_PLACEMENT_TRANSACTION_TYPE;
    };
    return ColoredCoinsAskOrderPlacement;
}(ColoredCoinsOrderPlacement));
exports.ColoredCoinsAskOrderPlacement = ColoredCoinsAskOrderPlacement;
var ColoredCoinsBidOrderPlacement = /** @class */ (function (_super) {
    __extends(ColoredCoinsBidOrderPlacement, _super);
    function ColoredCoinsBidOrderPlacement() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColoredCoinsBidOrderPlacement.prototype.getAppendixName = function () {
        return "BidOrderPlacement";
    };
    ColoredCoinsBidOrderPlacement.prototype.getTransactionType = function () {
        return transaction_type_1.COLORED_COINS_BID_ORDER_PLACEMENT_TRANSACTION_TYPE;
    };
    return ColoredCoinsBidOrderPlacement;
}(ColoredCoinsOrderPlacement));
exports.ColoredCoinsBidOrderPlacement = ColoredCoinsBidOrderPlacement;
var ColoredCoinsOrderCancellation = /** @class */ (function (_super) {
    __extends(ColoredCoinsOrderCancellation, _super);
    function ColoredCoinsOrderCancellation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColoredCoinsOrderCancellation.prototype.init = function (orderId) {
        this.orderId = long_1.default.fromString(orderId);
        return this;
    };
    ColoredCoinsOrderCancellation.prototype.getMySize = function () {
        return 8;
    };
    ColoredCoinsOrderCancellation.prototype.parse = function (buffer) {
        _super.prototype.parse.call(this, buffer);
        this.orderId = buffer.readInt64();
        return this;
    };
    ColoredCoinsOrderCancellation.prototype.putMyBytes = function (buffer) {
        buffer.writeInt64(this.orderId);
    };
    ColoredCoinsOrderCancellation.prototype.parseJSON = function (json) {
        _super.prototype.parseJSON.call(this, json);
        this.orderId = long_1.default.fromString(json["order"], true);
        return this;
    };
    ColoredCoinsOrderCancellation.prototype.putMyJSON = function (json) {
        json["order"] = this.orderId.toUnsigned().toString();
    };
    ColoredCoinsOrderCancellation.prototype.getFee = function () {
        return fee_1.Fee.ORDER_CANCELLATION_FEE;
    };
    ColoredCoinsOrderCancellation.prototype.getOrderId = function () {
        return this.orderId;
    };
    return ColoredCoinsOrderCancellation;
}(appendix_1.AbstractAppendix));
exports.ColoredCoinsOrderCancellation = ColoredCoinsOrderCancellation;
var ColoredCoinsAskOrderCancellation = /** @class */ (function (_super) {
    __extends(ColoredCoinsAskOrderCancellation, _super);
    function ColoredCoinsAskOrderCancellation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColoredCoinsAskOrderCancellation.prototype.getAppendixName = function () {
        return "AskOrderCancellation";
    };
    ColoredCoinsAskOrderCancellation.prototype.getTransactionType = function () {
        return transaction_type_1.ASK_ORDER_CANCELLATION_TRANSACTION_TYPE;
    };
    return ColoredCoinsAskOrderCancellation;
}(ColoredCoinsOrderCancellation));
exports.ColoredCoinsAskOrderCancellation = ColoredCoinsAskOrderCancellation;
var ColoredCoinsBidOrderCancellation = /** @class */ (function (_super) {
    __extends(ColoredCoinsBidOrderCancellation, _super);
    function ColoredCoinsBidOrderCancellation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColoredCoinsBidOrderCancellation.prototype.getAppendixName = function () {
        return "BidOrderCancellation";
    };
    ColoredCoinsBidOrderCancellation.prototype.getTransactionType = function () {
        return transaction_type_1.BID_ORDER_CANCELLATION_TRANSACTION_TYPE;
    };
    return ColoredCoinsBidOrderCancellation;
}(ColoredCoinsOrderCancellation));
exports.ColoredCoinsBidOrderCancellation = ColoredCoinsBidOrderCancellation;
var AccountControlEffectiveBalanceLeasing = /** @class */ (function (_super) {
    __extends(AccountControlEffectiveBalanceLeasing, _super);
    function AccountControlEffectiveBalanceLeasing() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AccountControlEffectiveBalanceLeasing.prototype.init = function (period) {
        this.period = period;
        return this;
    };
    AccountControlEffectiveBalanceLeasing.prototype.getMySize = function () {
        return 4;
    };
    AccountControlEffectiveBalanceLeasing.prototype.parse = function (buffer) {
        _super.prototype.parse.call(this, buffer);
        this.period = buffer.readInt32();
        return this;
    };
    AccountControlEffectiveBalanceLeasing.prototype.putMyBytes = function (buffer) {
        buffer.writeInt32(this.period);
    };
    AccountControlEffectiveBalanceLeasing.prototype.parseJSON = function (json) {
        _super.prototype.parseJSON.call(this, json);
        this.period = json["period"];
        return this;
    };
    AccountControlEffectiveBalanceLeasing.prototype.putMyJSON = function (json) {
        json["period"] = this.period;
    };
    AccountControlEffectiveBalanceLeasing.prototype.getAppendixName = function () {
        return "EffectiveBalanceLeasing";
    };
    AccountControlEffectiveBalanceLeasing.prototype.getTransactionType = function () {
        return transaction_type_1.EFFECTIVE_BALANCE_LEASING_TRANSACTION_TYPE;
    };
    AccountControlEffectiveBalanceLeasing.prototype.getFee = function () {
        return fee_1.Fee.EFFECTIVE_BALANCE_LEASING_FEE;
    };
    AccountControlEffectiveBalanceLeasing.prototype.getPeriod = function () {
        return this.period;
    };
    return AccountControlEffectiveBalanceLeasing;
}(appendix_1.AbstractAppendix));
exports.AccountControlEffectiveBalanceLeasing = AccountControlEffectiveBalanceLeasing;
var DigitalGoodsPurchaseAttachement = /** @class */ (function (_super) {
    __extends(DigitalGoodsPurchaseAttachement, _super);
    function DigitalGoodsPurchaseAttachement() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DigitalGoodsPurchaseAttachement.prototype.init = function (goodsId, quantity, priceNQT, deliveryDeadlineTimestamp) {
        this.goodsId = long_1.default.fromString(goodsId);
        this.quantity = quantity;
        this.priceNQT = long_1.default.fromString(priceNQT);
        this.deliveryDeadlineTimestamp = deliveryDeadlineTimestamp;
        return this;
    };
    DigitalGoodsPurchaseAttachement.prototype.getMySize = function () {
        return 8 + 4 + 8 + 4;
    };
    DigitalGoodsPurchaseAttachement.prototype.parse = function (buffer) {
        _super.prototype.parse.call(this, buffer);
        this.goodsId = buffer.readInt64();
        this.quantity = buffer.readInt32();
        this.priceNQT = buffer.readInt64();
        this.deliveryDeadlineTimestamp = buffer.readInt32();
        return this;
    };
    DigitalGoodsPurchaseAttachement.prototype.putMyBytes = function (buffer) {
        buffer.writeInt64(this.goodsId);
        buffer.writeInt32(this.quantity);
        buffer.writeInt64(this.priceNQT);
        buffer.writeInt32(this.deliveryDeadlineTimestamp);
    };
    DigitalGoodsPurchaseAttachement.prototype.parseJSON = function (json) {
        _super.prototype.parseJSON.call(this, json);
        this.goodsId = long_1.default.fromString(json["goods"], true);
        this.quantity = json["quantity"];
        this.priceNQT = long_1.default.fromString(json["priceNQT"], false);
        this.deliveryDeadlineTimestamp = json["deliveryDeadlineTimestamp"];
        return this;
    };
    DigitalGoodsPurchaseAttachement.prototype.putMyJSON = function (json) {
        json["goodsId"] = this.goodsId.toUnsigned().toString();
        json["quantity"] = this.quantity.toString();
        json["priceNQT"] = this.priceNQT.toString();
        json["deliveryDeadlineTimestamp"] = this.deliveryDeadlineTimestamp.toString();
    };
    DigitalGoodsPurchaseAttachement.prototype.getAppendixName = function () {
        return "DigitalGoodsPurchase";
    };
    DigitalGoodsPurchaseAttachement.prototype.getTransactionType = function () {
        return transaction_type_1.DIGITAL_GOODS_PURCHASE_TRANSACTION_TYPE;
    };
    DigitalGoodsPurchaseAttachement.prototype.getFee = function () {
        return fee_1.Fee.DIGITAL_GOODS_PURCHASE_FEE;
    };
    return DigitalGoodsPurchaseAttachement;
}(appendix_1.AbstractAppendix));
exports.DigitalGoodsPurchaseAttachement = DigitalGoodsPurchaseAttachement;
exports.ORDINARY_PAYMENT = new Payment();
exports.ARBITRARY_MESSAGE = new Message();
