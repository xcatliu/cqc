module.exports = function two() {
    const foo = 1;
    const bar = 100;

    let i;
    for (i = foo; i < bar; i++) {
        console.log(i);
    }
    for (i = foo; i < bar; i++) {
        console.log(i);
    }
    for (i = foo; i < bar; i++) {
        console.log(i);
    }

    if (bar < i) {
        return bar;
    }

    return baz();

    function baz() {
        const foo1 = 1;
        const bar1 = 100;

        let i1;
        for (i1 = foo1; i1 < bar1; i1++) {
            console.log(i1);
        }

        return i1;
    }
};
