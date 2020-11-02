const timetable = [
	// Title
	[`Timetable - FELIX 2.st - online learning`],
	// Monday
	[
		// Plameniaky
		`!chem@pl#707927882089103411$all%1^a^b`,
		`!sjl@pl#705012475728363521$all%2^a^b`,
		`!mat@pl#702918374707036210$all%3^a^b`,
		// Sovy
		`!obn@so#504184485735038977$all%0^a`,
		`!mat@so#728243870885871636$all%1^a^b`,
		`!chem@so#707927882089103411$all%2^a^b`,
		`!nej@so#695347340650872882$nej%3^a^b`,
		`!anjp@so#766327652616241172$anjplus%3^a^b`,
		// Vydry
		`!obn@vy#504184485735038977$all%0^b`,
		`!dej@vy#504184485735038977$all%1^a^b`,
		`!sjl@vy#282616599280877569$all%2^a^b`,
		`!mat@vy#728243870885871636$all%3^a^b`,
		// Vážky
		`!sjl@vá#705012475728363521$all%1^a^b`,
		`!dej@vá#504184485735038977$all%2^a^b`,
		`!sjl@vá#705012475728363521$all%3^a^b`,
		// Koaly
		`!sjl@ko#282616599280877569$all%1^a^b`,
		`!mat@ko#702918374707036210$all%2^a^b`,
		`!dej@ko#504184485735038977$all%3^a^b`,
		// Pandy
		`!mat@pa#728243870885871636$all%2^a^b`,
		`!sjl@pa#282616599280877569$all%3^a^b`,
		`!dej@pa#504184485735038977$all%4^a^b`,
	],
	// Tuesday
	[
		// Plameniaky
		`!mat@pl#702918374707036210$all%1^a^b`,
		`!dej@pl#504184485735038977$all%2^a^b`,
		`!obn@pl#504184485735038977$all%3^b`,
		// Sovy
		`!dej@so#504184485735038977$all%1^a^b`,
		`!anj@so#710043481959170090$anjzuzka%2^a^b`,
		`!anj@so#766327652616241172$anjeddy%2^a^b`,
		`!sjl@so#282616599280877569$all%3^a^b`,
		// Vydry
		`!chem@vy#707927882089103411$dievčatá%0^a^b`,
		`!sjl@vy#282616599280877569$all%2^a^b`,
		`!mat@vy#728243870885871636$all%3^a^b`,
		`!anj@vy#710043481959170090$anjzuzka%4^a^b`,
		`!anj@vy#765075641778962442$anjjanka%4^a^b`,
		// Vážky
		`!rk@vá#728243870885871636$all%0^a^b`,
		`!bio@vá#707927882089103411$skupina1%1^a`,
		`!geo@vá#707926623630131219$skupina2%1^a`,
		`!geo@vá#707926623630131219$skupina1%1^b`,
		`!bio@vá#707927882089103411$skupina2%1^b`,
		`!mat@vá#728243870885871636$all%2^a^b`,
		`!obn@vá#504184485735038977$all%3^a`,
		// Koaly
		`!rk@ko#710043481959170090$all%1^a^b`,
		`!sjl@ko#282616599280877569$all%2^a^b`,
		`!mat@ko#702918374707036210$all%3^a^b`,
		// Pandy
		`!mat@pa#728243870885871636$all%1^a^b`,
		`!geo@pa#707926623630131219$all%2^a^b`,
		// Ko & Pa
		`!anj@ko&pa#710043481959170090$all%3^a^b`,
		`!anj@ko&pa#766327652616241172$all%3^a^b`,
		`!anj@ko&pa#765075641778962442$all%3^a^b`,
	],
	// Wednesday
	[
		// Plameniaky
		`!rk@pl#702918374707036210$all%0^a^b`,
		`!sjl@pl#705012475728363521$all%1^a^b`,
		`!mat@pl#702918374707036210$all%2^a^b`,
		`!bio@pl#707927882089103411$all%3^a^b`,
		`!anj@pl#766327652616241172$all%3^a^b`,
		// Sovy
		`!rk@so#707926623630131219$all%0^a^b`,
		`!bio@so#707926623630131219$all%1^a^b`,
		`!huv@so#707934350435418133$all%2^a^b`,
		`!mat@so#728243870885871636$all%3^a^b`,
		// Vydry
		`!sjl@vy#282616599280877569$all%2^a^b`,
		`!huv@vy#707934350435418133$all%3^a^b`,
		`!bio@vy#707927882089103411$all%4^a^b`,
		`!anj@vy#710043481959170090$anjzuzka%5^a^b`,
		`!anj@vy#765075641778962442$anjjanka%5^a^b`,
		// Vážky
		`!sjl@vá#705012475728363521$all%2^a^b`,
		`!sjl@vá#705012475728363521$all%3^a^b`,
		// Koaly
		`!geo@ko#707926623630131219$all%2^a^b`,
		`!mat@ko#702918374707036210$all%3^a^b`,
		`!huv@ko#707934350435418133$all%4^a^b`,
		// Pandy
		`!rk@pa#282616599280877569$all%0^a^b`,
		`!huv@pa#707934350435418133$all%1^a^b`,
		`!mat@pa#728243870885871636$all%2^a^b`,
		`!sjl@pa#282616599280877569$all%3^a^b`,
	],
	// Thursday
	[
		// Plameniaky
		`!anj@pl#766327652616241172$all%1^a^b`,
		`!geo@pl#707926623630131219$all%2^a^b`,
		`!inf@pl#770133238483517470$all%3^a^b`,
		`!mat@pl#702918374707036210$all%4^a^b`,
		// Sovy
		`!sjl@so#282616599280877569$all%1^a^b`,
		`!anj@so#710043481959170090$anjzuzka%2^a^b`,
		`!anj@so#766327652616241172$anjeddy%2^a^b`,
		`!mat@so#728243870885871636$all%3^a^b`,
		`!inf@so#770133238483517470$all%4^a^b`,
		// Vydry
		`!rk@vy#707934350435418133$all%0^a^b`,
		`!fyz@vy#601010176312606720$skupina1%1^a`,
		`!geo@vy#707926623630131219$skupina2%1^a`,
		`!geo@vy#707926623630131219$skupina1%1^b`,
		`!fyz@vy#601010176312606720$skupina2%1^b`,
		`!chem@vy#707927882089103411$chlapci%2^a^b`,
		`!anjp@vy#766327652616241172$anjplus%3^a^b`,
		// Vážky
		`!mat@vá#728243870885871636$all%2^a^b`,
		`!fyz@vá#601010176312606720$chlapci%3^a`,
		`!fyz@vá#601010176312606720$dievčatá%3^b`,
		`!anj@vá#766327652616241172$anjeddy%4^a^b`,
		`!anj@vá#765075641778962442$anjjanka%4^a^b`,
		`!anj@vá#766327652616241172$anjeddy%5^a^b`,
		`!anj@vá#765075641778962442$anjjanka%5^a^b`,
		// Koaly
		`!inf@ko#764034144165691401$all%1^a^b`,
		`!sjl@ko#282616599280877569$all%2^a^b`,
		`!bio@ko#707927882089103411$all%3^a^b`,
		// Pandy
		`!inf@pa#764034144165691401$all%2^a^b`,
		`!sjl@pa#282616599280877569$all%3^a^b`,
	],
	// Friday
	[
		// Plameniaky
		`!sjl@pl#705012475728363521$all%1^a^b`,
		`!sjl@pl#705012475728363521$all%2^a^b`,
		`!nej@pl#695347340650872882$all%3^a^b`,
		`!fyz@pl#601010176312606720$all%4^a^b`,
		// Sovy
		`!sjl@so#282616599280877569$all%1^a^b`,
		`!geo@so#707926623630131219$all%2^a^b`,
		`!fyz@so#601010176312606720$all%3^a^b`,
		// Vydry
		`!fyz@vy#601010176312606720$skupina1%1^a`,
		`!geo@vy#707926623630131219$skupina2%1^a`,
		`!geo@vy#707926623630131219$skupina1%1^b`,
		`!fyz@vy#601010176312606720$skupina2%1^b`,
		`!mat@vy#728243870885871636$all%2^a^b`,
		`!inf@vy#764034144165691401$all%3^a^b`,
		`!nej@vy#695347340650872882$nej%4^a^b`,
		// Vážky
		`!mat@vá#728243870885871636$all%1^a^b`,
		`!fyz@vá#601010176312606720$chlapci%2^a`,
		`!fyz@vá#601010176312606720$dievčatá%2^b`,
		`!anj@vá#766327652616241172$anjeddy%3^a^b`,
		`!anj@vá#765075641778962442$anjjanka%3^a^b`,
		`!inf@vá#728243870885871636$infďuri%4^a^b`,
		`!inf@vá#764034144165691401$infbetka%4^a^b`,
		// Koaly
		`!sjl@ko#282616599280877569$all%3^a^b`,
		// Pandy
		`!sjl@pa#282616599280877569$all%2^a^b`,
		`!bio@pa#707927882089103411$all%3^a^b`,
		// Ko & Pa
		`!anj@ko&pa#710043481959170090$anjzuzka%4^a^b`,
		`!anj@ko&pa#766327652616241172$anjeddy%4^a^b`,
		`!anj@ko&pa#765075641778962442$anjjanka%4^a^b`,
	],
];

module.exports = timetable;