import { Component } from 'react'
// import fetch from 'isomorphic-unfetch'
import Product from '../../components/product'
import Layout from '../../components/layout'
import Head from 'next/head'


export async function getServerSideProps({ params }) {

    const res = await fetch(
        // `https://my-json-server.typicode.com/mareestephan/jsonProducts/pages_to_create `
        `http://www.json-generator.com/api/json/get/ckeElWByRe?indent=2`
    )

    const posts = await res.json();
    const displayProducts = posts.pages_to_create.filter(obj => obj.slug == "/clp/" + params.category)

    return (
        {
            props:
                { displayProducts }
        }
    )
}

export default class extends Component {

    render() {

        // const meta_description_full = this.props.displayProducts[0].meta_description;

        const meta_description_limit = 165;
        const trimmed_meta_description = this.props.displayProducts[0].meta_description.substring(0, meta_description_limit);
        return (
            <div >
                {/* content={this.props.displayProducts[0].meta_description} */}
                <Layout>
                    <Head>
                        <title>{this.props.displayProducts[0].meta_title}</title>
                        <meta name='description' content={trimmed_meta_description} />
                        <link rel='canonical' href={this.props.displayProducts[0].canonical} />
                    </ Head>

                    <Product products={this.props.displayProducts} />

                </Layout>
            </div>
        );
    }

}
