alert("=====");
        var items = [];
        $(document).ready(function () {
            alert('gggg');
            s = $("#text_to_convert").val();
            $(s).appendTo($("#items_content"));
            $("div.severity, .review, .dismiss-tooltip-wrapper").css("display", "none");
            //

            $(".highlight-item .content span").each(function (k, v) {
                item = {};
                $('a', v).each(function (i, j) {
                    j.text = j.text.replace(/(\r\n|\n|\r)/gm, "");
                    console.log(i + '-' + j.text);
                    if (i == 0) {
                        console.log('V-' + j.text);
                        item.id = j.text;
                    } else if (i == 1) {
                        console.log('F1-' + j.text);
                        item.frame1 = j.text;
                    } else if (i == 2) {
                        console.log('F2-' + j.text);
                        item.frame2 = j.text;
                    } else {
                        console.log('##### more a tags');

                    }
                    diff = item.frame2 - item.frame1;
                    item.diff = diff;
                });
                items.push(item);
            });
            items.sort((a, b) => a.diff - b.diff);
            console.log(items);
            console.log("items=" + items.length);
            str = getItemsString(items);
            console.log(str);
            $("#text_to_copy").val(str);
            $("#copybtn").click();
        });

        /* function displayItems(items) {
            console.log(getItemsString(items));
        } */

        function getItemsString(items) {
            var str = "";
            items.forEach((i, j) => {
                text = (j + 1) + ") " + i.id + " frames= " + i.diff + " | " + "frame1=" + i.frame1 + " | " +
                    "frame2=" + i.frame2 + "\n" + "\n";
                str += text;
            });
            return str;
        }

        /* function copyItemsToClipboard(items) {
            text = getItemsString(items);
            copyTextToClipboard(text);
        }

        function copyTextToClipboard(text) {
            el = $("#text_to_copy");
            el.val(text);
            el.select();
            document.execCommand("copy");
            console.log("-----copied");
        } */

        //has incomplete attributes at frames
        function doCopy() {
            console.log("in copy...");
            el = $("#text_to_copy");
            el.select();
            try {
                var successful = document.execCommand('copy');
                var msg = successful ? 'successful' : 'unsuccessful';
                console.log('Copying text command was ' + msg);
            } catch (err) {
                console.log('Oops, unable to copy');
            }
        }
