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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DIGITAL_GOODS_PURCHASE_TRANSACTION_TYPE = exports.EFFECTIVE_BALANCE_LEASING_TRANSACTION_TYPE = exports.BID_ORDER_CANCELLATION_TRANSACTION_TYPE = exports.ASK_ORDER_CANCELLATION_TRANSACTION_TYPE = exports.COLORED_COINS_BID_ORDER_PLACEMENT_TRANSACTION_TYPE = exports.COLORED_COINS_ASK_ORDER_PLACEMENT_TRANSACTION_TYPE = exports.COLORED_COINS_ASSET_TRANSFER_TRANSACTION_TYPE = exports.ARBITRARY_MESSAGE_TRANSACTION_TYPE = exports.ORDINARY_PAYMENT_TRANSACTION_TYPE = exports.DigitalGoodsPurchase = exports.DigitalGoods = exports.EffectiveBalanceLeasing = exports.AccountControl = exports.ColoredCoinsWhitelist = exports.BidOrderCancellation = exports.AskOrderCancellation = exports.ColoredCoinsOrderCancellation = exports.BidOrderPlacement = exports.AskOrderPlacement = exports.ColoredCoinsOrderPlacement = exports.AssetTransfer = exports.ColoredCoins = exports.ArbitraryMessage = exports.OrdinaryPayment = exports.TransactionType = void 0;
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
var attachment = __importStar(require("./attachment"));
var TransactionType = /** @class */ (function () {
    function TransactionType() {
    }
    TransactionType.findTransactionType = function (type, subtype) {
        if (type == this.TYPE_PAYMENT) {
            if (subtype == this.SUBTYPE_PAYMENT_ORDINARY_PAYMENT) {
                return exports.ORDINARY_PAYMENT_TRANSACTION_TYPE;
            }
        }
        else if (type == this.TYPE_MESSAGING) {
            if (subtype == this.SUBTYPE_MESSAGING_ARBITRARY_MESSAGE) {
                return exports.ARBITRARY_MESSAGE_TRANSACTION_TYPE;
            }
        }
        else if (type == this.TYPE_COLORED_COINS) {
            if (subtype == this.SUBTYPE_COLORED_COINS_ASSET_TRANSFER)
                return exports.COLORED_COINS_ASSET_TRANSFER_TRANSACTION_TYPE;
            else if (subtype == this.SUBTYPE_COLORED_COINS_ASK_ORDER_PLACEMENT)
                return exports.COLORED_COINS_ASK_ORDER_PLACEMENT_TRANSACTION_TYPE;
            else if (subtype == this.SUBTYPE_COLORED_COINS_BID_ORDER_PLACEMENT)
                return exports.COLORED_COINS_BID_ORDER_PLACEMENT_TRANSACTION_TYPE;
            else if (subtype == this.SUBTYPE_COLORED_COINS_ASK_ORDER_CANCELLATION)
                return exports.ASK_ORDER_CANCELLATION_TRANSACTION_TYPE;
            else if (subtype == this.SUBTYPE_COLORED_COINS_BID_ORDER_CANCELLATION)
                return exports.BID_ORDER_CANCELLATION_TRANSACTION_TYPE;
        }
        else if (type == this.TYPE_ACCOUNT_CONTROL) {
            if (subtype == this.SUBTYPE_ACCOUNT_CONTROL_EFFECTIVE_BALANCE_LEASING)
                return exports.EFFECTIVE_BALANCE_LEASING_TRANSACTION_TYPE;
        }
        else if (type == this.TYPE_DIGITAL_GOODS) {
            if (subtype == this.SUBTYPE_DIGITAL_GOODS_PURCHASE)
                return exports.DIGITAL_GOODS_PURCHASE_TRANSACTION_TYPE;
        }
    };
    TransactionType.prototype.mustHaveRecipient = function () {
        return this.canHaveRecipient();
    };
    TransactionType.TYPE_PAYMENT = 0;
    TransactionType.TYPE_MESSAGING = 1;
    TransactionType.TYPE_COLORED_COINS = 2;
    TransactionType.TYPE_DIGITAL_GOODS = 3;
    TransactionType.TYPE_ACCOUNT_CONTROL = 4;
    TransactionType.SUBTYPE_PAYMENT_ORDINARY_PAYMENT = 0;
    TransactionType.SUBTYPE_MESSAGING_ARBITRARY_MESSAGE = 0;
    TransactionType.SUBTYPE_COLORED_COINS_ASSET_TRANSFER = 1;
    TransactionType.SUBTYPE_COLORED_COINS_ASK_ORDER_PLACEMENT = 2;
    TransactionType.SUBTYPE_COLORED_COINS_BID_ORDER_PLACEMENT = 3;
    TransactionType.SUBTYPE_COLORED_COINS_ASK_ORDER_CANCELLATION = 4;
    TransactionType.SUBTYPE_COLORED_COINS_BID_ORDER_CANCELLATION = 5;
    TransactionType.SUBTYPE_ACCOUNT_CONTROL_EFFECTIVE_BALANCE_LEASING = 0;
    TransactionType.SUBTYPE_DIGITAL_GOODS_PURCHASE = 4;
    return TransactionType;
}());
exports.TransactionType = TransactionType;
var OrdinaryPayment = /** @class */ (function (_super) {
    __extends(OrdinaryPayment, _super);
    function OrdinaryPayment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OrdinaryPayment.prototype.getType = function () {
        return TransactionType.TYPE_PAYMENT;
    };
    OrdinaryPayment.prototype.getSubtype = function () {
        return TransactionType.SUBTYPE_PAYMENT_ORDINARY_PAYMENT;
    };
    OrdinaryPayment.prototype.parseAttachment = function (buffer) {
        return attachment.ORDINARY_PAYMENT.parse(buffer);
    };
    OrdinaryPayment.prototype.parseAttachmentJSON = function (json) {
        return attachment.ORDINARY_PAYMENT;
    };
    OrdinaryPayment.prototype.canHaveRecipient = function () {
        return true;
    };
    return OrdinaryPayment;
}(TransactionType));
exports.OrdinaryPayment = OrdinaryPayment;
var ArbitraryMessage = /** @class */ (function (_super) {
    __extends(ArbitraryMessage, _super);
    function ArbitraryMessage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ArbitraryMessage.prototype.getType = function () {
        return TransactionType.TYPE_MESSAGING;
    };
    ArbitraryMessage.prototype.getSubtype = function () {
        return TransactionType.SUBTYPE_MESSAGING_ARBITRARY_MESSAGE;
    };
    ArbitraryMessage.prototype.parseAttachment = function (buffer) {
        return attachment.ARBITRARY_MESSAGE.parse(buffer);
    };
    ArbitraryMessage.prototype.parseAttachmentJSON = function (json) {
        return attachment.ARBITRARY_MESSAGE;
    };
    ArbitraryMessage.prototype.canHaveRecipient = function () {
        return true;
    };
    ArbitraryMessage.prototype.mustHaveRecipient = function () {
        return false;
    };
    return ArbitraryMessage;
}(TransactionType));
exports.ArbitraryMessage = ArbitraryMessage;
var ColoredCoins = /** @class */ (function (_super) {
    __extends(ColoredCoins, _super);
    function ColoredCoins() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColoredCoins.prototype.getType = function () {
        return TransactionType.TYPE_COLORED_COINS;
    };
    return ColoredCoins;
}(TransactionType));
exports.ColoredCoins = ColoredCoins;
var AssetTransfer = /** @class */ (function (_super) {
    __extends(AssetTransfer, _super);
    function AssetTransfer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AssetTransfer.prototype.getSubtype = function () {
        return TransactionType.SUBTYPE_COLORED_COINS_ASSET_TRANSFER;
    };
    AssetTransfer.prototype.parseAttachment = function (buffer) {
        return new attachment.AssetTransfer().parse(buffer);
    };
    AssetTransfer.prototype.parseAttachmentJSON = function (json) {
        return new attachment.AssetTransfer().parseJSON(json);
    };
    AssetTransfer.prototype.canHaveRecipient = function () {
        return true;
    };
    return AssetTransfer;
}(ColoredCoins));
exports.AssetTransfer = AssetTransfer;
var ColoredCoinsOrderPlacement = /** @class */ (function (_super) {
    __extends(ColoredCoinsOrderPlacement, _super);
    function ColoredCoinsOrderPlacement() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColoredCoinsOrderPlacement.prototype.canHaveRecipient = function () {
        return false;
    };
    return ColoredCoinsOrderPlacement;
}(ColoredCoins));
exports.ColoredCoinsOrderPlacement = ColoredCoinsOrderPlacement;
var AskOrderPlacement = /** @class */ (function (_super) {
    __extends(AskOrderPlacement, _super);
    function AskOrderPlacement() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AskOrderPlacement.prototype.getSubtype = function () {
        return TransactionType.SUBTYPE_COLORED_COINS_ASK_ORDER_PLACEMENT;
    };
    AskOrderPlacement.prototype.parseAttachment = function (buffer) {
        return new attachment.ColoredCoinsAskOrderPlacement().parse(buffer);
    };
    AskOrderPlacement.prototype.parseAttachmentJSON = function (json) {
        return new attachment.ColoredCoinsAskOrderPlacement().parseJSON(json);
    };
    return AskOrderPlacement;
}(ColoredCoinsOrderPlacement));
exports.AskOrderPlacement = AskOrderPlacement;
var BidOrderPlacement = /** @class */ (function (_super) {
    __extends(BidOrderPlacement, _super);
    function BidOrderPlacement() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BidOrderPlacement.prototype.getSubtype = function () {
        return TransactionType.SUBTYPE_COLORED_COINS_BID_ORDER_PLACEMENT;
    };
    BidOrderPlacement.prototype.parseAttachment = function (buffer) {
        return new attachment.ColoredCoinsBidOrderPlacement().parse(buffer);
    };
    BidOrderPlacement.prototype.parseAttachmentJSON = function (json) {
        return new attachment.ColoredCoinsBidOrderPlacement().parseJSON(json);
    };
    return BidOrderPlacement;
}(ColoredCoinsOrderPlacement));
exports.BidOrderPlacement = BidOrderPlacement;
var ColoredCoinsOrderCancellation = /** @class */ (function (_super) {
    __extends(ColoredCoinsOrderCancellation, _super);
    function ColoredCoinsOrderCancellation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColoredCoinsOrderCancellation.prototype.canHaveRecipient = function () {
        return false;
    };
    return ColoredCoinsOrderCancellation;
}(ColoredCoins));
exports.ColoredCoinsOrderCancellation = ColoredCoinsOrderCancellation;
var AskOrderCancellation = /** @class */ (function (_super) {
    __extends(AskOrderCancellation, _super);
    function AskOrderCancellation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AskOrderCancellation.prototype.getSubtype = function () {
        return TransactionType.SUBTYPE_COLORED_COINS_ASK_ORDER_CANCELLATION;
    };
    AskOrderCancellation.prototype.parseAttachment = function (buffer) {
        return new attachment.ColoredCoinsAskOrderCancellation().parse(buffer);
    };
    AskOrderCancellation.prototype.parseAttachmentJSON = function (json) {
        return new attachment.ColoredCoinsAskOrderCancellation().parseJSON(json);
    };
    return AskOrderCancellation;
}(ColoredCoinsOrderCancellation));
exports.AskOrderCancellation = AskOrderCancellation;
var BidOrderCancellation = /** @class */ (function (_super) {
    __extends(BidOrderCancellation, _super);
    function BidOrderCancellation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BidOrderCancellation.prototype.getSubtype = function () {
        return TransactionType.SUBTYPE_COLORED_COINS_BID_ORDER_CANCELLATION;
    };
    BidOrderCancellation.prototype.parseAttachment = function (buffer) {
        return new attachment.ColoredCoinsBidOrderCancellation().parse(buffer);
    };
    BidOrderCancellation.prototype.parseAttachmentJSON = function (json) {
        return new attachment.ColoredCoinsBidOrderCancellation().parseJSON(json);
    };
    return BidOrderCancellation;
}(ColoredCoinsOrderCancellation));
exports.BidOrderCancellation = BidOrderCancellation;
var ColoredCoinsWhitelist = /** @class */ (function (_super) {
    __extends(ColoredCoinsWhitelist, _super);
    function ColoredCoinsWhitelist() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColoredCoinsWhitelist.prototype.canHaveRecipient = function () {
        return false;
    };
    return ColoredCoinsWhitelist;
}(ColoredCoins));
exports.ColoredCoinsWhitelist = ColoredCoinsWhitelist;
var AccountControl = /** @class */ (function (_super) {
    __extends(AccountControl, _super);
    function AccountControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AccountControl.prototype.getType = function () {
        return TransactionType.TYPE_ACCOUNT_CONTROL;
    };
    AccountControl.prototype.canHaveRecipient = function () {
        return true;
    };
    return AccountControl;
}(TransactionType));
exports.AccountControl = AccountControl;
var EffectiveBalanceLeasing = /** @class */ (function (_super) {
    __extends(EffectiveBalanceLeasing, _super);
    function EffectiveBalanceLeasing() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EffectiveBalanceLeasing.prototype.getSubtype = function () {
        return TransactionType.SUBTYPE_ACCOUNT_CONTROL_EFFECTIVE_BALANCE_LEASING;
    };
    EffectiveBalanceLeasing.prototype.parseAttachment = function (buffer) {
        return new attachment.AccountControlEffectiveBalanceLeasing().parse(buffer);
    };
    EffectiveBalanceLeasing.prototype.parseAttachmentJSON = function (json) {
        return new attachment.AccountControlEffectiveBalanceLeasing().parseJSON(json);
    };
    return EffectiveBalanceLeasing;
}(AccountControl));
exports.EffectiveBalanceLeasing = EffectiveBalanceLeasing;
var DigitalGoods = /** @class */ (function (_super) {
    __extends(DigitalGoods, _super);
    function DigitalGoods() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DigitalGoods.prototype.getType = function () {
        return TransactionType.TYPE_DIGITAL_GOODS;
    };
    return DigitalGoods;
}(TransactionType));
exports.DigitalGoods = DigitalGoods;
var DigitalGoodsPurchase = /** @class */ (function (_super) {
    __extends(DigitalGoodsPurchase, _super);
    function DigitalGoodsPurchase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DigitalGoodsPurchase.prototype.getSubtype = function () {
        return TransactionType.SUBTYPE_DIGITAL_GOODS_PURCHASE;
    };
    DigitalGoodsPurchase.prototype.parseAttachment = function (buffer) {
        return new attachment.DigitalGoodsPurchaseAttachement().parse(buffer);
    };
    DigitalGoodsPurchase.prototype.parseAttachmentJSON = function (json) {
        return new attachment.DigitalGoodsPurchaseAttachement().parseJSON(json);
    };
    DigitalGoodsPurchase.prototype.canHaveRecipient = function () {
        return true;
    };
    return DigitalGoodsPurchase;
}(DigitalGoods));
exports.DigitalGoodsPurchase = DigitalGoodsPurchase;
exports.ORDINARY_PAYMENT_TRANSACTION_TYPE = new OrdinaryPayment();
exports.ARBITRARY_MESSAGE_TRANSACTION_TYPE = new ArbitraryMessage();
exports.COLORED_COINS_ASSET_TRANSFER_TRANSACTION_TYPE = new AssetTransfer();
exports.COLORED_COINS_ASK_ORDER_PLACEMENT_TRANSACTION_TYPE = new AskOrderPlacement();
exports.COLORED_COINS_BID_ORDER_PLACEMENT_TRANSACTION_TYPE = new BidOrderPlacement();
exports.ASK_ORDER_CANCELLATION_TRANSACTION_TYPE = new AskOrderCancellation();
exports.BID_ORDER_CANCELLATION_TRANSACTION_TYPE = new BidOrderCancellation();
exports.EFFECTIVE_BALANCE_LEASING_TRANSACTION_TYPE = new EffectiveBalanceLeasing();
exports.DIGITAL_GOODS_PURCHASE_TRANSACTION_TYPE = new DigitalGoodsPurchase();
