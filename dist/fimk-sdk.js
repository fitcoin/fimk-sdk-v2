"use strict";
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
exports.FimkSDK = exports.Configuration = exports.Transaction = exports.TransactionImpl = exports.Builder = exports.attachment = void 0;
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
var crypto_1 = require("./crypto");
var _attachment = __importStar(require("./attachment"));
var builder = __importStar(require("./builder"));
var transaction = __importStar(require("./transaction"));
var utils_1 = require("./utils");
var attachment_1 = require("./attachment");
var fee_1 = require("./fee");
exports.attachment = _attachment;
exports.Builder = builder.Builder;
exports.TransactionImpl = builder.TransactionImpl;
exports.Transaction = transaction.Transaction;
var Configuration = /** @class */ (function () {
    function Configuration(args) {
        this.isTestnet = false;
        if (args) {
            if (utils_1.isDefined(args.isTestnet))
                this.isTestnet = !!args.isTestnet;
        }
    }
    return Configuration;
}());
exports.Configuration = Configuration;
var FimkSDK = /** @class */ (function () {
    function FimkSDK(config) {
        var config_ = config ? config : new Configuration();
        this.config = config_;
    }
    FimkSDK.prototype.parseTransactionBytes = function (transactionBytesHex) {
        return exports.TransactionImpl.parse(transactionBytesHex, this.config.isTestnet);
    };
    FimkSDK.prototype.parseTransactionJSON = function (json) {
        return exports.TransactionImpl.parseJSON(json, this.config.isTestnet);
    };
    FimkSDK.prototype.passphraseEncrypt = function (plainText, passphrase) {
        return crypto_1.passphraseEncrypt(plainText, passphrase).encode();
    };
    FimkSDK.prototype.passphraseDecrypt = function (cipherText, passphrase) {
        var encrypted = crypto_1.PassphraseEncryptedMessage.decode(cipherText);
        return crypto_1.passphraseDecrypt(encrypted, passphrase);
    };
    FimkSDK.prototype.payment = function (recipientOrRecipientPublicKey, amount) {
        return new exports.Transaction(this, recipientOrRecipientPublicKey, new exports.Builder()
            .isTestnet(this.config.isTestnet)
            .attachment(exports.attachment.ORDINARY_PAYMENT)
            .amountHQT(utils_1.convertToQNT(amount)));
    };
    FimkSDK.prototype.arbitraryMessage = function (recipientOrRecipientPublicKey, message) {
        return new exports.Transaction(this, recipientOrRecipientPublicKey, new exports.Builder()
            .isTestnet(this.config.isTestnet)
            .attachment(exports.attachment.ARBITRARY_MESSAGE)
            .amountHQT("0")).publicMessage(message);
    };
    FimkSDK.prototype.privateMessage = function (recipientPublicKey, message) {
        return new exports.Transaction(this, recipientPublicKey, new exports.Builder()
            .isTestnet(this.config.isTestnet)
            .attachment(exports.attachment.ARBITRARY_MESSAGE)
            .amountHQT("0")).privateMessage(message);
    };
    FimkSDK.prototype.privateMessageToSelf = function (message) {
        return new exports.Transaction(this, null, // if null and provide private message then to send encrypted message to self
        new exports.Builder()
            .isTestnet(this.config.isTestnet)
            .attachment(exports.attachment.ARBITRARY_MESSAGE)
            .amountHQT("0")).privateMessageToSelf(message);
    };
    FimkSDK.prototype.assetTransfer = function (recipientOrRecipientPublicKey, assetId, quantity, feeHQT) {
        var builder = new exports.Builder()
            .isTestnet(this.config.isTestnet)
            .attachment(new attachment_1.AssetTransfer().init(assetId, quantity))
            .amountHQT("0")
            .feeHQT(feeHQT ? feeHQT : fee_1.Fee.ASSET_TRANSFER_FEE);
        return new exports.Transaction(this, recipientOrRecipientPublicKey, builder);
    };
    FimkSDK.prototype.placeAskOrder = function (currencyId, assetId, quantity, price, expiration) {
        var builder = new exports.Builder()
            .isTestnet(this.config.isTestnet)
            .attachment(new attachment_1.ColoredCoinsAskOrderPlacement().init(currencyId, assetId, quantity, price, expiration))
            .amountHQT("0")
            .feeHQT("10000000");
        return new exports.Transaction(this, "0", builder);
    };
    FimkSDK.prototype.placeBidOrder = function (currencyId, assetId, quantity, price, expiration) {
        var builder = new exports.Builder()
            .isTestnet(this.config.isTestnet)
            .attachment(new attachment_1.ColoredCoinsBidOrderPlacement().init(currencyId, assetId, quantity, price, expiration))
            .amountHQT("0")
            .feeHQT("10000000");
        return new exports.Transaction(this, "0", builder);
    };
    FimkSDK.prototype.cancelAskOrder = function (orderId) {
        var builder = new exports.Builder()
            .isTestnet(this.config.isTestnet)
            .attachment(new attachment_1.ColoredCoinsAskOrderCancellation().init(orderId))
            .amountHQT("0")
            .feeHQT("10000000");
        return new exports.Transaction(this, "0", builder);
    };
    FimkSDK.prototype.cancelBidOrder = function (orderId) {
        var builder = new exports.Builder()
            .isTestnet(this.config.isTestnet)
            .attachment(new attachment_1.ColoredCoinsBidOrderCancellation().init(orderId))
            .amountHQT("0")
            .feeHQT("10000000");
        return new exports.Transaction(this, "0", builder);
    };
    return FimkSDK;
}());
exports.FimkSDK = FimkSDK;
