# ONow API Structure :

## 1. Initialization :

#### - When the Page first loads, some data about the store should be fetched. and in order to make the response time & size as minimalistic as possible, i'll specify exactly what i need.

Here is a list of the required fields : (**_Subject to change_**)

```
	 {
		 store_name: {
			  en:string,
			  ar:string,
			},
		 store_images: {
			 logo: string,
			 heroImage_desktop : string,
			 heroImage_mobile : string,
			  },
		 store_theme:{
			primary_color:string(hex),
			  },
		 payment_methods:[
			 {
			   name:{
				ar:string,
				en:string
			  }
			}
		 ],
		 order_modes:string[],
		 cart_total:string;
	}
```

## 2. **_Branches_** :

A list of the store's branches

```
 [{
	name:{
		ar:string,
		en:string
		 },
	opening_hours:[
		{
		 day:string;
		 from:string;
		 to:string
		 }
	],
	coords:{
		lat:number;
		lng:number;
	},
	delivery:{
		enabled:boolean;
		cost:string;
		time:string
	 }
  }]
```

## 3. **_Cart_** :

I would suggest erasing the cart after 24h of abandoning.
Cart Object would be something like this:

1.  Get Cart :

```
 {
	 items:[
			 {
				 id:number,
				 name:{
					 ar:string;
					 en:string
				  },
				 slug:string,
				 price:string,
				 total_price:string,(*Quantity)
				 image:string,
				 quantity:string,
				 extras:[]
			 }
		 ],
	 total:string,

  }
```

2. Add To Cart **_(POST)_** :

```
	 {
	 quantity:number,
	 extras:number[],(variations.. idk about this),
	  }

```

## 3. **_User Addresses_** :

A List of saved user addresses.

```
 {
	[ {
		id:number,
		coords:{
				lat:number;
				lng:number
			},
		is_default:boolean,
		details:{
				area:string,
				address:string,
				building:string,
				block:string,
				street:string,
				floor:string,
				additional_directions:string(extra directions from the user)
			}
		}
	 ]
}

```
