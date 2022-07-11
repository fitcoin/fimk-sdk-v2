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
import * as attachment from "./attachment"
import ByteBuffer from "bytebuffer"

export abstract class TransactionType {
  public static TYPE_PAYMENT = 0
  public static TYPE_MESSAGING = 1
  public static TYPE_COLORED_COINS = 2
  public static TYPE_DIGITAL_GOODS = 3
  public static TYPE_ACCOUNT_CONTROL = 4
  public static SUBTYPE_PAYMENT_ORDINARY_PAYMENT = 0
  public static SUBTYPE_MESSAGING_ARBITRARY_MESSAGE = 0
  public static SUBTYPE_COLORED_COINS_ASSET_TRANSFER = 1
  public static SUBTYPE_COLORED_COINS_ASK_ORDER_PLACEMENT = 2
  public static SUBTYPE_COLORED_COINS_BID_ORDER_PLACEMENT = 3
  public static SUBTYPE_COLORED_COINS_ASK_ORDER_CANCELLATION = 4
  public static SUBTYPE_COLORED_COINS_BID_ORDER_CANCELLATION = 5
  public static SUBTYPE_ACCOUNT_CONTROL_EFFECTIVE_BALANCE_LEASING = 0
  public static SUBTYPE_DIGITAL_GOODS_PURCHASE = 4

  abstract getType(): number
  abstract getSubtype(): number
  abstract parseAttachment(buffer: ByteBuffer): attachment.Attachment
  abstract parseAttachmentJSON(json: { [key: string]: any }): attachment.Attachment
  abstract canHaveRecipient(): boolean

  public static findTransactionType(type: number, subtype: number) {
    if (type == this.TYPE_PAYMENT) {
      if (subtype == this.SUBTYPE_PAYMENT_ORDINARY_PAYMENT) {
        return ORDINARY_PAYMENT_TRANSACTION_TYPE
      }
    } else if (type == this.TYPE_MESSAGING) {
      if (subtype == this.SUBTYPE_MESSAGING_ARBITRARY_MESSAGE) {
        return ARBITRARY_MESSAGE_TRANSACTION_TYPE
      }
    } else if (type == this.TYPE_COLORED_COINS) {
      if (subtype == this.SUBTYPE_COLORED_COINS_ASSET_TRANSFER)
        return COLORED_COINS_ASSET_TRANSFER_TRANSACTION_TYPE
      else if (subtype == this.SUBTYPE_COLORED_COINS_ASK_ORDER_PLACEMENT)
        return COLORED_COINS_ASK_ORDER_PLACEMENT_TRANSACTION_TYPE
      else if (subtype == this.SUBTYPE_COLORED_COINS_BID_ORDER_PLACEMENT)
        return COLORED_COINS_BID_ORDER_PLACEMENT_TRANSACTION_TYPE
      else if (subtype == this.SUBTYPE_COLORED_COINS_ASK_ORDER_CANCELLATION)
        return ASK_ORDER_CANCELLATION_TRANSACTION_TYPE
      else if (subtype == this.SUBTYPE_COLORED_COINS_BID_ORDER_CANCELLATION)
        return BID_ORDER_CANCELLATION_TRANSACTION_TYPE
    } else if (type == this.TYPE_ACCOUNT_CONTROL) {
      if (subtype == this.SUBTYPE_ACCOUNT_CONTROL_EFFECTIVE_BALANCE_LEASING)
        return EFFECTIVE_BALANCE_LEASING_TRANSACTION_TYPE
    } else if (type == this.TYPE_DIGITAL_GOODS) {
      if (subtype == this.SUBTYPE_DIGITAL_GOODS_PURCHASE)
        return DIGITAL_GOODS_PURCHASE_TRANSACTION_TYPE
    }
  }

  mustHaveRecipient(): boolean {
    return this.canHaveRecipient()
  }
}

export class OrdinaryPayment extends TransactionType {
  getType() {
    return TransactionType.TYPE_PAYMENT
  }
  getSubtype() {
    return TransactionType.SUBTYPE_PAYMENT_ORDINARY_PAYMENT
  }
  parseAttachment(buffer: ByteBuffer) {
    return attachment.ORDINARY_PAYMENT.parse(buffer)
  }
  parseAttachmentJSON(json: { [key: string]: any }) {
    return attachment.ORDINARY_PAYMENT
  }
  canHaveRecipient() {
    return true
  }
}

export class ArbitraryMessage extends TransactionType {
  getType() {
    return TransactionType.TYPE_MESSAGING
  }
  getSubtype() {
    return TransactionType.SUBTYPE_MESSAGING_ARBITRARY_MESSAGE
  }
  parseAttachment(buffer: ByteBuffer) {
    return attachment.ARBITRARY_MESSAGE.parse(buffer)
  }
  parseAttachmentJSON(json: { [key: string]: any }) {
    return attachment.ARBITRARY_MESSAGE
  }
  canHaveRecipient() {
    return true
  }
  mustHaveRecipient(): boolean {
    return false
  }
}

export abstract class ColoredCoins extends TransactionType {
  getType() {
    return TransactionType.TYPE_COLORED_COINS
  }
}


export class AssetTransfer extends ColoredCoins {
  getSubtype() {
    return TransactionType.SUBTYPE_COLORED_COINS_ASSET_TRANSFER
  }
  parseAttachment(buffer: ByteBuffer) {
    return new attachment.AssetTransfer().parse(buffer)
  }
  parseAttachmentJSON(json: { [key: string]: any }) {
    return new attachment.AssetTransfer().parseJSON(json)
  }
  canHaveRecipient() {
    return true
  }
}

export abstract class ColoredCoinsOrderPlacement extends ColoredCoins {
  canHaveRecipient(): boolean {
    return false
  }
}

export class AskOrderPlacement extends ColoredCoinsOrderPlacement {
  getSubtype() {
    return TransactionType.SUBTYPE_COLORED_COINS_ASK_ORDER_PLACEMENT
  }
  parseAttachment(buffer: ByteBuffer) {
    return new attachment.ColoredCoinsAskOrderPlacement().parse(buffer)
  }
  parseAttachmentJSON(json: { [key: string]: any }) {
    return new attachment.ColoredCoinsAskOrderPlacement().parseJSON(json)
  }
}

export class BidOrderPlacement extends ColoredCoinsOrderPlacement {
  getSubtype() {
    return TransactionType.SUBTYPE_COLORED_COINS_BID_ORDER_PLACEMENT
  }
  parseAttachment(buffer: ByteBuffer) {
    return new attachment.ColoredCoinsBidOrderPlacement().parse(buffer)
  }
  parseAttachmentJSON(json: { [key: string]: any }) {
    return new attachment.ColoredCoinsBidOrderPlacement().parseJSON(json)
  }
}

export abstract class ColoredCoinsOrderCancellation extends ColoredCoins {
  canHaveRecipient(): boolean {
    return false
  }
}

export class AskOrderCancellation extends ColoredCoinsOrderCancellation {
  getSubtype() {
    return TransactionType.SUBTYPE_COLORED_COINS_ASK_ORDER_CANCELLATION
  }
  parseAttachment(buffer: ByteBuffer) {
    return new attachment.ColoredCoinsAskOrderCancellation().parse(buffer)
  }
  parseAttachmentJSON(json: { [key: string]: any }) {
    return new attachment.ColoredCoinsAskOrderCancellation().parseJSON(json)
  }
}

export class BidOrderCancellation extends ColoredCoinsOrderCancellation {
  getSubtype() {
    return TransactionType.SUBTYPE_COLORED_COINS_BID_ORDER_CANCELLATION
  }
  parseAttachment(buffer: ByteBuffer) {
    return new attachment.ColoredCoinsBidOrderCancellation().parse(buffer)
  }
  parseAttachmentJSON(json: { [key: string]: any }) {
    return new attachment.ColoredCoinsBidOrderCancellation().parseJSON(json)
  }
}

export abstract class ColoredCoinsWhitelist extends ColoredCoins {
  canHaveRecipient(): boolean {
    return false
  }
}

export abstract class AccountControl extends TransactionType {
  getType(): number {
    return TransactionType.TYPE_ACCOUNT_CONTROL
  }
  canHaveRecipient(): boolean {
    return true
  }
}

export class EffectiveBalanceLeasing extends AccountControl {
  getSubtype() {
    return TransactionType.SUBTYPE_ACCOUNT_CONTROL_EFFECTIVE_BALANCE_LEASING
  }
  parseAttachment(buffer: ByteBuffer) {
    return new attachment.AccountControlEffectiveBalanceLeasing().parse(buffer)
  }
  parseAttachmentJSON(json: { [key: string]: any }) {
    return new attachment.AccountControlEffectiveBalanceLeasing().parseJSON(json)
  }
}

export abstract class DigitalGoods extends TransactionType {
  getType(): number {
    return TransactionType.TYPE_DIGITAL_GOODS
  }
}

export class DigitalGoodsPurchase extends DigitalGoods {
  getSubtype() {
    return TransactionType.SUBTYPE_DIGITAL_GOODS_PURCHASE
  }
  parseAttachment(buffer: ByteBuffer) {
    return new attachment.DigitalGoodsPurchaseAttachement().parse(buffer)
  }
  parseAttachmentJSON(json: { [key: string]: any }) {
    return new attachment.DigitalGoodsPurchaseAttachement().parseJSON(json)
  }
  canHaveRecipient(): boolean {
    return true;
  }
}

export const ORDINARY_PAYMENT_TRANSACTION_TYPE = new OrdinaryPayment()
export const ARBITRARY_MESSAGE_TRANSACTION_TYPE = new ArbitraryMessage()
export const COLORED_COINS_ASSET_TRANSFER_TRANSACTION_TYPE = new AssetTransfer()
export const COLORED_COINS_ASK_ORDER_PLACEMENT_TRANSACTION_TYPE = new AskOrderPlacement()
export const COLORED_COINS_BID_ORDER_PLACEMENT_TRANSACTION_TYPE = new BidOrderPlacement()
export const ASK_ORDER_CANCELLATION_TRANSACTION_TYPE = new AskOrderCancellation()
export const BID_ORDER_CANCELLATION_TRANSACTION_TYPE = new BidOrderCancellation()
export const EFFECTIVE_BALANCE_LEASING_TRANSACTION_TYPE = new EffectiveBalanceLeasing()
export const DIGITAL_GOODS_PURCHASE_TRANSACTION_TYPE = new DigitalGoodsPurchase()
