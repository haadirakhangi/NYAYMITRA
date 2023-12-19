import React from 'react'
import './comunity.css'

type Props = {}

const community = (props: Props) => {
    return (
        <div>
            <header className='header'>
                <img src="https://upload.wikimedia.org/wikipedia/commons/9/9a/CodePen_logo.png" width="300" height="75" alt="Logo" />
                <div id="info">
                    <h1 id="name"><a href="/">CodePen</a></h1>
                    <nav>
                        <ul>
                            <li><a href="/"><i className="fa fa-home"></i>Home</a></li>
                            <li><a href="/trending"><i className="fa fa-codepen"></i>Featured</a></li>
                            <li><a href="/about">About</a></li>
                        </ul>
                    </nav>
                </div>
                <div id="links">
                    <div id="link-container">
                        <a className="fa fa-boomark"></a>
                        <a className="fa fa-microphone"></a>
                        <a className="fa fa-file-code"></a>
                    </div>
                </div>
            </header>
            <main>
                <aside>
                    <h2>Welcome to CodePen</h2>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo soluta impedit, saepe rerum atque totam iure. Vero velit, eos beatae temporibus, ullam dolorem dicta laborum suscipit ut facilis quae minus!</p>
                    <hr />
                    <div id="start">Start Coding</div>
                </aside>
                <div id="content">
                    <div id="post">
                        <div id="user-img">
                            <i className="fa fa-user" style={{ fontSize: '40px' }}></i>
                        </div>
                        <div id="placeholder">What's on your mind?</div>
                    </div>
                    <article>
                        <h2>Lorem Ipsum</h2>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem cupiditate officia repellat fugiat, recusandae suscipit natus modi dolores corrupti labore commodi illo impedit in enim id facere molestiae placeat eos.</p>
                    </article>
                    <article>
                        <h2>Dolor?</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, labore cumque? Temporibus ex nostrum officia. Vel officiis provident aliquid rem accusamus! Iure eligendi dicta dolorem repellendus deleniti quidem laboriosam, blanditiis alias labore unde porro consequatur incidunt, pariatur cumque similique illum? Nobis, quos. Esse labore omnis vitae tempore. Doloribus unde, accusantium itaque laboriosam sapiente numquam laborum quia quam fugit officia delectus voluptatem quos, eos quas in! Error suscipit officiis labore adipisci sit in dicta expedita ducimus debitis cumque quas dolorum, accusantium, facilis cupiditate omnis. Minus eos ea modi sint in nostrum saepe harum accusantium sunt animi, veritatis beatae ducimus excepturi omnis?</p>
                    </article>
                    <article>
                        <h2>Sit amet con</h2>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid et pariatur omnis expedita, odio laborum cupiditate sint repellendus possimus praesentium sit, adipisci quisquam. Iusto vero adipisci possimus, quo, molestias maxime sequi repudiandae porro, hic architecto ut neque ratione. Ut iusto nemo aperiam vitae. Quidem deserunt aspernatur reiciendis ratione labore vero!</p>
                    </article>
                    <article>
                        <h2>Orav eta olsi nemo CodePen</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam at ex recusandae asperiores quos cumque explicabo doloribus dolore dolores fuga. Velit blanditiis aperiam harum. Fugit recusandae sed magni nobis assumenda iusto, pariatur molestias amet sint repellendus sit ipsum ipsam eaque perferendis praesentium beatae ullam dignissimos fugiat doloremque quibusdam quos! Ipsum, laboriosam numquam. Ratione consequatur quas dolore optio necessitatibus! Reprehenderit dolore doloremque dolorum reiciendis nisi tempora id voluptas exercitationem optio praesentium consequuntur, distinctio suscipit a sit repellat dolor maxime corporis accusantium quod facere nobis delectus! Delectus suscipit libero dolor iste numquam aliquid, natus commodi incidunt, amet non perferendis impedit eligendi ipsam!</p>
                    </article>
                    <article>
                        <h2>Lorem Ipsum</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt ipsa labore quia pariatur eius praesentium reprehenderit ratione, dolore explicabo voluptates, quasi eum beatae soluta rerum fugit sunt in ducimus facilis, cupiditate amet quae et temporibus! Nihil minima esse soluta dignissimos tempora praesentium veniam optio eaque autem, voluptas repellendus maiores inventore suscipit porro quos quis voluptates a eos eligendi necessitatibus placeat, deserunt id consequuntur nostrum? Commodi veritatis, ex eius id exercitationem suscipit? Temporibus nesciunt dicta voluptas illo eos fugiat dolore veniam. Rerum unde libero est! Provident quis eius unde quam, quos, repellendus explicabo labore praesentium, deserunt corporis consectetur dignissimos iste ratione! Perferendis eos neque officiis et facilis harum praesentium ea voluptatum debitis. Harum beatae eveniet hic a laboriosam blanditiis provident ad perspiciatis quaerat facere. Provident molestiae dolore doloribus velit veniam earum dolores beatae veritatis voluptatibus! Deserunt veniam atque impedit vero ullam reprehenderit nihil corrupti delectus ea! Iusto cupiditate distinctio consequatur sequi?</p>
                    </article>
                    <article>
                        <h2>Dul!</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, dicta!</p>
                    </article>
                </div>
            </main>
        </div>
    )
}

export default community