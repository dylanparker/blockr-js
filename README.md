BlockrJS
=========

## About

A simple JavaScript wrapper for the <a href="http://blockr.io/documentation/api">Blockr.io v1 API</a>

Retrieve coin, address, transaction and blockchain info for the following cryptocoins:
Bitcoin, Bitcoin-Testnet, Litecoin, Digitalcoin, Quark, Peercoin and Megacoin.

## Requirements

No JavaScript library requirements.

Note that this JS was originally written to be used within an <a href="https://cordova.apache.org/">Apache Cordova</a> mobile application.
If used directly in a browser it will surely fail while trying to make a cross-domain request to blockr.io

<br />
# Documentation



## Coin Selection and HTTPS

The following coins are supported by this API:
Bitcoin, Bitcoin-Testnet, Litecoin, Digitalcoin, Quark, Peercoin and Megacoin

Select the coin to query for by specifying the associated subdomain.
The default is bitcoin (btc).

	Blockr.setCoinSubdomain("btc");	// Bitcoin
	Blockr.setCoinSubdomain("tbtc"); // Bitcoin (Testnet)
	Blockr.setCoinSubdomain("ltc"); // litecoin
	Blockr.setCoinSubdomain("dgc"); // Digitalcoin
	Blockr.setCoinSubdomain("qrk"); // Quark
	Blockr.setCoinSubdomain("ppc"); // Peercoin
	Blockr.setCoinSubdomain("mec"); // Megacoin

By default all calls are made over HTTP. To use HTTPS, call setHttpsEnabled(bool).

	Blockr.setHttpsEnabled(true);

<br />
## Blockr API Methods

All Blockr API calls utilize a single callback function to handle the returned data. The data is returned as an object in the <a href="http://labs.omniti.com/labs/jsend">JSend format</a>. The JSend status field will indicate whether an error occurred. Read more about the JSend format here: <a href="http://labs.omniti.com/labs/jsend">http://labs.omniti.com/labs/jsend</a> 

<br />
### Coin Methods

#### `Blockr.coin.info( callback )`

Retrieve information about the currently selected coin and return that data via the `callback` function. The returned object will include info like: coin name, abbreviation, volume, last block number, next difficulty and some market prices.


	Blockr.coin.info(function(o) {
		console.log( o.data.coin.name );	  // console displays "Bitcoin"
	});

**<a href="http://btc.blockr.io/api/v1/coin/info">Live Example</a>**

See the <a href="http://blockr.io/documentation/api">Blockr API </a> docs for specifics of the returned data.

<br />
### Exchange Rate Methods

####`Blockr.exchangerate.current( callback )`

Retrieve the current exchange rate used by Blockr.io and return that data via the `callback` function. 
All exchange rates are based on the USD. See the <a href="http://blockr.io/documentation/api">Blockr API </a> docs for info on how to work with these numbers.


	Blockr.exchangerate.current(function(o) {
		console.log( o.data[0].rates.CAD );	  // console displays "1.093001"
	});

**<a href="http://btc.blockr.io/api/v1/exchangerate/current">Live Example</a>**

<br />

### Block Methods

Retrieve data about a specific block or set of blocks.

With each Block-related API call, the `block` parameter can be one of:

* block number ( e.g. <a href="http://btc.blockr.io/api/v1/block/info/223212">223212</a> )
* list of block numbers separated by commas ( e.g. <a href="http://btc.blockr.io/api/v1/block/info/223212,223213,223214">223212,223213,223214</a> )
* block hash ( e.g. <a href="http://btc.blockr.io/api/v1/block/info/0000000000000000210b10d620600dc1cc2380bb58eb2408f9767eb792ed31fa">0000000000000000210b10d620600dc1cc2380bb58eb2408f9767eb792ed31fa</a> )
* list of block hashes separated by commas 
* the word "last" to always get the <a href="http://btc.blockr.io/api/v1/block/info/last">latest</a> block

<br />
**`Blockr.block.info( block, callback )`**
	
Retrieve block general info.

	Blockr.block.info(block, function(o) {
		console.log( o.data.confirmations );	  // console displays "312"
	});


<br />
**`Blockr.block.txs( block, callback )`**

Retrieve transactions within a block.

	Blockr.block.txs(block, function(o) {
		console.log( o.data.txs[0].fee );	  // console displays "0.0001"
	});

<br />
**`Blockr.block.raw( block, callback )`**

Returns raw block data in the bitcoin format.

	Blockr.block.raw(block, function(o) {
		console.log( o.data.tx[18] );	  // console displays "2b0239151…e07c1bd71b60"
	});

See the <a href="http://blockr.io/documentation/api">Blockr API </a> docs for specifics of the returned data.

<br />

### Transaction Methods

Retrieve data about a specific transaction or set of transactions.

In each transaction-related method, the `tx` parameter is a hex transaction hash like: <a href="http://btc.blockr.io/api/v1/tx/info/60c1f1a3160042152114e2bba45600a5045711c3a8a458016248acec59653471">60c1f1a3160042152114e2bba45600a5045711c3a8a458016248acec59653471</a>

You can request data for multiple transactions by including multiple transaction hashes separated by commas.

<br />
**`Blockr.tx.info( tx, callback )`**

Returns transaction data for unconfirmed and normal blockchain transactions.

	Blockr.tx.info(tx, function(o) {
		console.log( o.data.block );	  // console displays "233958"
	});



<br />
**`Blockr.tx.raw( tx, callback )`**

Returns raw transaction data in the bitcoin format.

	Blockr.tx.raw(tx, function(o) {
		console.log( o.data.tx.time );	  // console displays "1367355521"
	});


See the <a href="http://blockr.io/documentation/api">Blockr API </a> docs for specifics of the returned data.

<br />

### Address Methods

Retrieve data about a specific address or set of addresses.

In each address-related method, the `address` parameter is a public address like: <a href="http://btc.blockr.io/api/v1/address/info/198aMn6ZYAczwrE5NvNTUMyJ5qkfy4g3Hi">198aMn6ZYAczwrE5NvNTUMyJ5qkfy4g3Hi</a>

You can request data for multiple addresses by including multiple public addresses separated by commas.

<br />
**`Blockr.address.info( address, callback, opt_confs )`**

Retrieves general info about a specific public address.

The `opt_confs` parameter will filter any transactions with less than `opt_confs` confirmations. The maximum value for `opt_confs` is 15.

	Blockr.address.info(address, function(o) {
		console.log( o.data.totalreceived );	  // console displays "123.001337"
	}, confirmations);

<br />
**`Blockr.address.balance( address, callback, opt_confs )`**

Retrieves the balance for a specific public address.

The `opt_confs` parameter will filter any transactions with less than `opt_confs` confirmations. The maximum value for `opt_confs` is 15.

	Blockr.address.balance(address, function(o) {
		console.log( o.data.balance );	  // console displays "123.001337"
	}, confirmations);

<br />
**`Blockr.address.txs( address, callback )`**

Retrieves the most recent transactions (up to 200) for a specific public address.

	Blockr.address.txs(address, function(o) {
		console.log( o.data.txs[3].amount );	  // console displays "0.5"
	});


<br />
**`Blockr.address.unspent( address, callback )`**

Retrieves the unspent transactions for a specific public address.

	Blockr.address.unspent(address, function(o) {
		console.log( o.data.unspent[0].confirmations );	  // console displays "2827"
	});


<br />
**`Blockr.address.unconfirmed( address, callback )`**

Retrieves the unconfirmed transactions associated with a specific public address.

	Blockr.address.unconfirmed(address, function(o) {
		console.log( o.data.unconfirmed[3].amount );	  // console displays "0.04"
	});

See the <a href="http://blockr.io/documentation/api">Blockr API </a> docs for specifics of the returned data.
