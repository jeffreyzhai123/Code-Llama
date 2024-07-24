
describe("Test get user id", function() {
    it('get user id successful', async() => {
        const user_id = "user_2iRkLPhAxeb9pqeO29Zfe1QtbZr";

        const response = await fetch(`http://localhost:3080/results/${user_id}`);
        if (response.ok) {
            expect(response.status)
            .to
            .equal(200);

            let data = await response.json();
            let resultUserId = data.userid;

            expect(resultUserId)
            .to
            .equal(user_id);
        } else {
            throw new Error('Failed to fetch userid');
        }
    });

    it('get user id unsuccessful', async() => {
        const user_id_no_exist = "user_4iRkLPhAxeb9pqeO29Zfe1QtbZ11";
        const response = await fetch(`http://localhost:3080/results/${user_id_no_exist}`);
        if (response.ok) {
            expect(response.status)
            .to
            .equal(404);

            let data = await response.json();
            expect(data.errormsg)
            .to
            .equal("Not found");
        } 
    });


});


