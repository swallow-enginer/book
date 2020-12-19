import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search';
import { useRouter } from 'next/router';
import AppConst from "~/src/lib/appConst";

const styles = theme => ({
    //入力項目
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },

    //検索バー
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit,
            width: 'auto',
        },
    },

    //検索アイコン
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },

    //入力項目
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: "120px",
            '&:focus': {
                width: "200px",
            },
        },
    },
});

function Search(props) {
    const { classes } = props;
    const router = useRouter();
    const [keyword, setKeyword] = useState();   //キーワード

    //検索処理
    const handleSearch = (e) => {
        //Enterボタン以外
        if (e.keyCode !== 13 || !keyword) {
            return;
        }

        router.push({
            pathname: AppConst.URL.SEARCH_RESULT,
            query: { keyword: keyword }
        })
    }

    return (
        <div>
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <Input
                    placeholder="検索…"
                    disableUnderline
                    value={keyword}
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyDown={handleSearch}
                />
            </div>
        </div>
    )
}

Search.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Search);
