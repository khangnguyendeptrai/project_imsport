import React, { useEffect, useState } from "react";
import ProductGridPage from "../components/ProductGridPage";
import { useParams } from "react-router-dom";
import Breadcrumb from "../components/Filter/Breadcrumb";
import { dataNew } from "../data/dataNew";
import FilterContainer from "../components/Filter/FilterContainer";
import FilterByCategories from "../components/Filter/FilterByCategories";
// === Import 3 file JS gốc ===
import { categoriesType } from "../data/categoriesType.js"
import { categories } from "../data/categories.js";
import { products } from "../data/products.js";

const pages = {
  men: {
    title: "ĐỒ NAM",
    description: `
      <h2><strong>Đồ Chạy Bộ Nam – Sự Lựa Chọn Của Những Runner Đẳng Cấp</strong></h2>
      <p>Bạn đang tìm kiếm trang phục và giày chạy bộ <strong>cao cấp</strong>, đáp ứng được cả yếu tố 
      <em>hiệu suất, sự bền bỉ và tính thời trang</em>? Bộ sưu tập <strong>đồ chạy bộ nam</strong> tại 
      <strong> IMSPORTS</strong> mang đến những sản phẩm <strong>tốt nhất thế giới</strong>, giúp bạn 
      <strong> tối ưu trải nghiệm chạy và chinh phục mọi cung đường.</strong></p>

      <h3>1. Vì sao runner cần đầu tư vào đồ chạy bộ chuyên dụng?</h3>
      <ul>
        <li>✓ <strong>Công nghệ vải tiên tiến:</strong> Thoáng khí, hút ẩm nhanh giúp cơ thể luôn khô ráo và thoải mái.</li>
        <li>✓ <strong>Thiết kế tối ưu hiệu suất:</strong> Co giãn linh hoạt, ôm vừa vặn nhưng không bó chặt, hỗ trợ chuyển động tối đa.</li>
        <li>✓ <strong>Trọng lượng siêu nhẹ:</strong> Giảm thiểu lực cản, cho cảm giác linh hoạt và tự do.</li>
        <li>✓ <strong>Thương hiệu cao cấp:</strong> Chỉ mang đến những sản phẩm từ các thương hiệu thể thao hàng đầu thế giới.</li>
      </ul>

      <h3>2. Bộ sưu tập đồ chạy bộ nam tại IMSPORTS</h3>
      <ul>
        <li>👕 <strong>Áo chạy bộ nam:</strong> Áo tank top, áo thun, áo dài tay thoáng khí, co giãn tốt.</li>
        <li>🩳 <strong>Quần chạy bộ nam:</strong> Siêu nhẹ, nhanh khô, hỗ trợ chuyển động tự nhiên.</li>
        <li>🧥 <strong>Áo khoác chạy bộ:</strong> Giữ ấm, chống gió, bảo vệ cơ thể trong điều kiện khắc nghiệt.</li>
        <li>👟 <strong>Giày chạy bộ:</strong> Êm ái, hỗ trợ tốt cho bàn chân, độ bám cao.</li>
        <li>🥾 <strong>Giày chạy địa hình (trail running):</strong> 
          <ul>
            <li>• <strong>HOKA</strong> – Thương hiệu giày trail “quốc dân”, phù hợp với địa hình Việt Nam.</li>
            <li>• <strong>NNormal & Norda</strong> – Hiệu suất cao, bám địa hình cực tốt.</li>
          </ul>
        </li>
        <li>🩴 <strong>Dép phục hồi (recovery sandals):</strong> Giúp phục hồi cơ chân nhanh sau tập luyện.</li>
        <li>🎽 <strong>Phụ kiện chạy bộ:</strong> Tất nén, mũ, bao tay, dây đai, mắt kính, túi nước,...</li>
      </ul>

      <h3>3. Những thương hiệu chạy bộ cao cấp tại IMSPORTS</h3>
      <p>🔥 <strong>Giày chạy bộ nam:</strong> HOKA, NNormal, Norda, ON Running, Saucony, Xeroshoes, Salomon.</p>
      <p>🔥 <strong>Trang phục chạy bộ:</strong> ON Running, Soar Running, 2XU, Compressport, Raidlight, T8, Runderwear.</p>

      <h3>4. Cách chọn đồ chạy bộ nam phù hợp theo nhu cầu</h3>
      <ul>
        <li>☀️ <strong>Chạy bộ trong thời tiết nóng:</strong> Áo thoáng khí, quần short nhẹ, giày có độ thông thoáng cao.</li>
        <li>🏃‍♂️ <strong>Chạy đường dài / marathon:</strong> Quần short có túi đựng gel, áo chống nắng, giày đệm êm.</li>
        <li>⛰ <strong>Chạy địa hình (trail running):</strong> Giày HOKA, NNormal hoặc Norda; áo khoác gió, quần bó thoải mái.</li>
        <li>💪 <strong>Tập luyện hàng ngày & chạy cự ly ngắn:</strong> Áo thun thể thao, quần short linh hoạt, dép recovery.</li>
      </ul>

      <h3>🔥 Sẵn sàng nâng tầm trải nghiệm chạy bộ của bạn?</h3>
      <p>Tất cả sản phẩm tại <strong>IMSPORTS</strong> đều thuộc phân khúc 
      <strong> chạy bộ cao cấp</strong>, giúp bạn <em>tận hưởng từng bước chạy với sự thoải mái và hiệu suất tối ưu nhất.</em></p>

      <p>Cửa hàng thể thao IMSPORTS cung cấp đa dạng sản phẩm từ quần áo, giày, phụ kiện đến thiết bị chuyên dụng, 
      mang đến cho cộng đồng runner Việt Nam những lựa chọn tốt nhất. Chúng tôi tự hào là địa chỉ uy tín hàng đầu 
      cho các vận động viên và người yêu chạy bộ.</p>

      <p>IMSPORTS – <em>Đồng hành cùng từng bước chạy của bạn!</em> 🏅</p>
    `,
  },
  women: {
    title: "ĐỒ NỮ",
    description: `
      <h2><strong>Đồ Chạy Bộ Nữ – Thoải Mái, Phong Cách & Hiệu Suất Tối Ưu</strong></h2>
        <p>Bạn là một nữ runner đang tìm kiếm trang phục chạy bộ hoàn hảo? Bộ sưu tập <strong>đồ chạy bộ nữ</strong> tại IMSPORTS mang đến sự kết hợp giữa <strong>thoải mái, thời trang và hiệu suất</strong>, giúp bạn tự tin bứt phá trên mọi cung đường.</p>

        <h3>1. Vì sao cần đầu tư vào đồ chạy bộ chuyên dụng?</h3>
        <ul>
          <li>✓ <strong>Thoáng khí & thấm hút mồ hôi:</strong> Chất liệu cao cấp giúp bạn luôn khô ráo, thoáng mát trong suốt quá trình chạy.</li>
          <li>✓ <strong>Co giãn & ôm sát vừa vặn:</strong> Tạo sự thoải mái tối đa, không gây cọ xát hay khó chịu.</li>
          <li>✓ <strong>Trọng lượng nhẹ & nhanh khô:</strong> Giúp tối ưu hiệu suất, đặc biệt với những buổi chạy đường dài hoặc cường độ cao.</li>
          <li>✓ <strong>Phong cách thời trang hiện đại:</strong> Không chỉ dành cho chạy bộ, bạn còn có thể diện những bộ đồ này khi tập gym, yoga hoặc hoạt động ngoài trời.</li>
        </ul>

        <h3>2. Danh mục đồ chạy bộ nữ có gì?</h3>
        <ul>
          <li><strong>Áo chạy bộ nữ:</strong> Áo tank top, áo thun thể thao, áo dài tay, tích hợp công nghệ thoáng khí, chống nắng.</li>
          <li><strong>Quần chạy bộ nữ:</strong> Từ quần short nhẹ nhàng, quần legging ôm sát đến quần 2 lớp linh hoạt.</li>
          <li><strong>Váy chạy bộ nữ:</strong> Lựa chọn lý tưởng cho những ai yêu thích sự nữ tính nhưng vẫn đảm bảo hiệu suất thể thao.</li>
          <li><strong>Áo khoác chạy bộ nữ:</strong> Bảo vệ khỏi gió lạnh, mưa nhẹ và điều kiện thời tiết khắc nghiệt.</li>
          <li><strong>Áo ngực thể thao (running bra):</strong> Được thiết kế chuyên biệt để nâng đỡ, giảm chấn động khi chạy, mang lại sự thoải mái tối đa.</li>
          <li><strong>Giày chạy bộ nữ:</strong> Đáp ứng mọi nhu cầu từ chạy đường nhựa, chạy địa hình đến thi đấu marathon.</li>
          <li><strong>Dép chạy bộ nữ (recovery sandals):</strong> Phục hồi đôi chân sau những buổi chạy dài, giảm áp lực lên bàn chân.</li>
          <li><strong>Phụ kiện chạy bộ nữ:</strong> Tất chạy bộ, mũ, găng tay, hỗ trợ tối đa trong quá trình luyện tập.</li>
        </ul>

        <h3>3. Những thương hiệu hàng đầu có mặt tại IMSPORTS</h3>
        <p>Chúng tôi tự hào mang đến những sản phẩm từ <strong>các thương hiệu chạy bộ cao cấp</strong>, được các vận động viên tin dùng như:</p>
        <ul>
          <li>👟 <strong>Giày chạy bộ nữ:</strong> ON Running, HOKA, Altra, Salomon, Brooks Running.</li>
          <li>👚 <strong>Trang phục chạy bộ nữ:</strong> 2XU, Compressport, Raidlight, T8, Soar Running, Runderwear.</li>
        </ul>

        <h3>4. Lựa chọn đồ chạy bộ nữ phù hợp – Bí quyết nâng cao trải nghiệm chạy</h3>
        <ul>
          <li><strong>Chạy trong thời tiết nóng ☀️ →</strong> Chọn áo thoáng khí, quần short nhẹ, giày chạy thông thoáng.</li>
          <li><strong>Chạy đường dài / marathon 🏃‍♀️ →</strong> Quần legging ôm sát, áo chống nắng, giày đệm êm ái.</li>
          <li><strong>Chạy địa hình (trail running) 🏔️ →</strong> Giày bám địa hình tốt, áo khoác nhẹ chống gió, quần có túi tiện lợi.</li>
          <li><strong>Tập luyện & chạy hàng ngày 💪 →</strong> Áo thun thể thao, áo bra nâng đỡ, dép recovery sau chạy.</li>
        </ul>

        <h3>🔥 Sẵn sàng nâng tầm cuộc chạy của bạn?</h3>
        <p>Khám phá ngay <strong>bộ sưu tập đồ chạy bộ nữ</strong> tại <strong>IMSPORTS</strong> và chọn cho mình trang phục phù hợp nhất! ✨</p>
    `,
  },
  watch: {
    title: "ĐỒNG HỒ GPS",
    description: `
      <h3>Đồng hồ chạy bộ GPS là gì?</h3>
      <p>Ở thời điểm hiện tại, môn thể thao marathon đã trở nên vô cùng phổ biến với đông đảo người yêu thể thao. Sự gia tăng số lượng người tham gia đã thúc đẩy sự ra đời của các công cụ hỗ trợ cho người chạy bộ. Trong số đó, <strong>đồng hồ chạy bộ GPS</strong> là một thiết bị hết sức hữu ích cho các vận động viên.</p>
      <p>Đồng hồ chạy bộ là một thiết bị điện tử đeo tay được thiết kế đặc biệt để đo và ghi lại thông tin liên quan đến hoạt động chạy bộ của người sử dụng. Nó cung cấp cho người dùng các dữ liệu quan trọng như thời gian, khoảng cách đã chạy, tốc độ, nhịp tim, và nhiều thông số khác. Thiết bị này giúp người dùng theo dõi và cải thiện hiệu suất chạy bộ, đồng thời cung cấp thông tin hữu ích để theo dõi sức khỏe và thể lực.</p>
      <img src="https://pos.nvncdn.com/be3294-43017/pc/cateCT/20230702_xdlh2Z4a.jpg" alt="Vận động viên sử dụng đồng hồ chạy bộ" style="width:100%; height:auto; border-radius: 8px; margin: 15px 0;" />

      <h3>Công dụng của đồng hồ chạy bộ GPS</h3>
      <h4>Đo quãng đường và thời gian chạy</h4>
      <p>Đây là tính năng cơ bản nhất mà bất kỳ chiếc đồng hồ chạy bộ nào cũng phải có. Với sự tích hợp của công nghệ GPS và các cảm biến chuyên dụng, đồng hồ có thể xác định chính xác quãng đường và thời gian mà người dùng đã chạy, giúp họ đánh giá tiến bộ và so sánh hiệu suất.</p>
      
      <h4>Tính năng GPS</h4>
      <p>Tính năng GPS của đồng hồ chạy bộ là một công nghệ tiên tiến mang lại nhiều lợi ích đáng kể. Bằng cách tích hợp hệ thống định vị toàn cầu (GPS), đồng hồ giúp xác định vị trí chính xác của người dùng trong thời gian thực, cho biết rõ đường đi và quãng đường đã đi được. Thông qua tín hiệu GPS, đồng hồ cung cấp thông tin chi tiết về khoảng cách đã chạy, tốc độ trung bình, tốc độ hiện tại, cũng như vị trí địa lý trên bản đồ.</p>
      <img src="https://pos.nvncdn.com/be3294-43017/pc/cateCT/20230702_weAvavAJ.jpg" alt="Tính năng GPS trên đồng hồ" style="width:100%; height:auto; border-radius: 8px; margin: 15px 0;" />
      
      <h4>Tính năng tính toán lượng calo đã mất</h4>
      <p>Tính năng này là một công cụ hữu ích giúp người dùng ước tính mức đốt cháy calo trong quá trình chạy. Bằng cách sử dụng các thông số như trọng lượng cơ thể, khoảng cách và thời gian, đồng hồ có thể hiển thị ước lượng lượng calo mà người dùng đã tiêu hao, đóng vai trò quan trọng trong việc theo dõi và quản lý luyện tập.</p>

      <h3>Các loại đồng hồ chạy bộ</h3>
      <h4>Đồng hồ chạy road</h4>
      <p>Những chiếc đồng hồ chạy road (chạy đường bằng) thường yêu cầu ít tính năng và chỉ cần một số tính năng cơ bản là đủ để đáp ứng nhu cầu của các vận động viên. Người dùng thường quan tâm hơn đến thiết kế, trọng lượng và sự thoải mái.</p>
      
      <h4>Đồng hồ chạy trail</h4>
      <p>Chạy trail là một bộ môn mạo hiểm, đòi hỏi một chiếc đồng hồ có nhiều tính năng mạnh mẽ hơn. Những thứ bạn cần ở một chiếc đồng hồ trail là thời lượng pin dài, có tính năng GPS, đo độ cao, điều hướng chính xác, độ bền cao và khả năng nạp pin trong khi sử dụng.</p>
      <img src="https://pos.nvncdn.com/be3294-43017/pc/cateCT/20230702_UqOpjuaQ.jpg" alt="Vận động viên chạy trail với đồng hồ chuyên dụng" style="width:100%; height:auto; border-radius: 8px; margin: 15px 0;" />
      
      <h4>Đồng hồ 3 môn phối hợp (Triathlon)</h4>
      <p>Một chiếc đồng hồ chuyên dụng cho triathlon có khả năng đo đạc các chỉ số khi tham gia cả 3 môn bơi, đạp xe và chạy bộ. Đồng thời, chiếc đồng hồ cũng cần có tính năng chống nước tốt trong thời gian dài.</p>

      <h3>Các thương hiệu đồng hồ chạy bộ tốt nhất</h3>
      <h4>Đồng hồ Coros</h4>
      <p>Thương hiệu đồng hồ chạy bộ Coros được xem là một trong những lựa chọn hàng đầu trên thị trường hiện nay. Với việc kết hợp giữa phần cứng cao cấp và công nghệ tiên tiến, Coros mang đến cho các vận động viên sự bền bỉ với các thiết bị mà họ có thể dựa vào ngay cả trong những môi trường khắc nghiệt nhất.</p>
      <img src="https://pos.nvncdn.com/be3294-43017/pc/cateCT/20230702_nYaJuvLz.jpg" alt="Thương hiệu đồng hồ Coros" style="width:100%; height:auto; border-radius: 8px; margin: 15px 0;" />
      
      <h4>Đồng hồ Garmin</h4>
      <p>Garmin là một công ty công nghệ nổi tiếng với các sản phẩm định hướng GPS. Ở Việt Nam, đồng hồ chạy bộ Garmin là một thương hiệu được nhiều người tin dùng. Với các tính năng thông minh như định vị GPS, đo bước chân, đo nhịp tim và các tính năng tối ưu khác, đồng hồ Garmin trở thành sự lựa chọn hoàn hảo cho những người yêu thích chạy bộ.</p>
      <img src="https://pos.nvncdn.com/be3294-43017/pc/cateCT/20230702_meg727Qk.jpg" alt="Thương hiệu đồng hồ Garmin" style="width:100%; height:auto; border-radius: 8px; margin: 15px 0;" />
      
      <h4>Các thương hiệu khác</h4>
      <ul>
          <li><strong>Đồng hồ Suunto:</strong> Thương hiệu đến từ Phần Lan, tập trung vào các thiết bị định vị GPS và đo nhịp tim chính xác.</li>
          <li><strong>Đồng hồ Polar:</strong> Thương hiệu từ Thụy Điển, được đánh giá cao với tính năng theo dõi nhịp tim chính xác và khả năng đồng bộ dữ liệu.</li>
          <li><strong>Đồng hồ Fitbit:</strong> Thương hiệu nổi tiếng với các thiết bị theo dõi sức khỏe và hoạt động, cung cấp tính năng GPS và kết nối ứng dụng di động.</li>
          <li><strong>Đồng hồ Apple Watch:</strong> Một lựa chọn phổ biến cho người tập thể dục và chạy bộ, cung cấp các tính năng định vị GPS, theo dõi nhịp tim và kết nối ứng dụng.</li>
      </ul>

      <h3>Một số mẫu đồng hồ chạy bộ tốt nhất</h3>
      <h4>Đồng hồ chạy bộ Coros Pace 2 - Đồng hồ chạy road tốt nhất</h4>
      <p>Coros Pace 2 là chiếc đồng hồ chạy bộ tuyệt vời dành cho những runner ưa thích sự nhẹ nhàng, đơn giản cùng thời lượng pin ấn tượng, đa dạng chức năng và giá cả vô cùng phải chăng. Đây là chiếc đồng hồ chạy bộ nhẹ nhất thế giới với trọng lượng chỉ 29g và được vận động viên marathon vĩ đại Eliud Kipchoge sử dụng để luyện tập và thi đấu.</p>

      <h4>Đồng hồ Garmin Forerunner 55</h4>
      <p>Garmin Forerunner 55 là một đồng hồ chạy bộ thông minh được thiết kế để cung cấp các tính năng cần thiết cho người tập luyện. Với màn hình hiển thị rõ nét và khả năng kết nối GPS chính xác, Forerunner 55 cho phép người dùng theo dõi quãng đường, thời gian, tốc độ, nhịp tim và nhiều thông số khác.</p>
      <img src="https://pos.nvncdn.com/be3294-43017/pc/cateCT/20230702_z75xmsRh.jpg" alt="Đồng hồ Garmin Forerunner 55" style="width:100%; height:auto; border-radius: 8px; margin: 15px 0;" />

      <h4>Đồng hồ Coros Vertix 2 - Đồng hồ chạy trail tốt nhất</h4>
      <p>Với những tính năng mạnh mẽ của mình, nếu bạn là một vận động viên Ultra trail hay là nhà thám hiểm thì chắc chắn bạn nên lựa chọn Coros Vertix 2.</p>
      <img src="https://pos.nvncdn.com/be3294-43017/pc/cateCT/20230702_GFHXQAWU.jpg" alt="Đồng hồ Coros Vertix 2" style="width:100%; height:auto; border-radius: 8px; margin: 15px 0;" />

      <h4>Đồng hồ Garmin Forerunner 265 - Đồng hồ chạy bộ cao cấp có màn hình AMOLED</h4>
      <p>Garmin Forerunner 265 là một đồng hồ chạy bộ cao cấp ra mắt năm 2023 với màn hình AMOLED đẹp mắt và tính năng đa dạng. Với màn hình AMOLED, người dùng có thể trải nghiệm hình ảnh sắc nét, màu sắc tươi sáng và độ tương phản cao.</p>
      <img src="https://pos.nvncdn.com/be3294-43017/pc/cateCT/20230702_QIYE1R2n.jpg" alt="Đồng hồ Garmin Forerunner 265" style="width:100%; height:auto; border-radius: 8px; margin: 15px 0;" />

      <h4>Đồng hồ Coros Apex 2 Pro - Đồng hồ tốt nhất cho Triathlon</h4>
      <p>Là một trong 2 mẫu đồng hồ mới nhất của Coros, Apex 2 Pro là mẫu đồng hồ mạnh mẽ với thiết kế đẹp, độ bền cao và chắc chắn là có tiêu chuẩn chống nước cực tốt. Không hầm hố như Vertix 2, Apex 2 Pro cân bằng giữa thiết kế đẹp với các tính năng thể thao tuyệt vời.</p>
      <img src="https://pos.nvncdn.com/be3294-43017/pc/cateCT/20230702_90kDBLwj.jpg" alt="Đồng hồ Coros Apex 2 Pro" style="width:100%; height:auto; border-radius: 8px; margin: 15px 0;" />
      
      <h3>Một số câu hỏi thường gặp về đồng hồ chạy bộ</h3>
      <h4>Có nên mua đồng hồ chạy bộ hay không?</h4>
      <p>Câu trả lời phụ thuộc vào nhu cầu và sở thích cá nhân. Đồng hồ chạy bộ có thể giúp bạn theo dõi thông tin về quãng đường, thời gian, nhịp tim và nhiều tính năng khác, giúp bạn cải thiện hiệu suất tập luyện. Nếu bạn cần cải thiện hiệu suất chạy bộ thì câu trả lời chắc chắn là có.</p>

      <h4>Đồng hồ chạy bộ khác gì đồng hồ thông minh?</h4>
      <p>Đồng hồ chạy bộ thường được thiết kế đặc biệt cho các hoạt động thể thao và tập luyện. Nó tập trung vào tính năng như đo quãng đường, thời gian, nhịp tim. Trong khi đó, đồng hồ thông minh có thể có nhiều tính năng khác như thông báo tin nhắn, cuộc gọi, đồng bộ dữ liệu với điện thoại và ứng dụng khác.</p>

      <h4>Đồng hồ chạy bộ có nghe nhạc được không?</h4>
      <p>Một số đồng hồ chạy bộ có tính năng nghe nhạc tích hợp hoặc có khả năng kết nối với điện thoại thông qua Bluetooth để phát nhạc. Tuy nhiên, không phải tất cả các mẫu đều có tính năng này. Một số mẫu đồng hồ có thể nghe nhạc như: Coros Vertix 2, Coros Apex 2 (Pro), Garmin Forerunner 265/265s, Garmin Forerunner 965.</p>

      <h4>Đồng hồ chạy bộ có đo nhịp tim hay không?</h4>
      <p>Hầu hết các đồng hồ chạy bộ hiện đại có tính năng đo nhịp tim tích hợp. Điều này giúp bạn theo dõi nhịp tim của mình trong quá trình tập luyện để điều chỉnh mức độ và hiệu quả của bài tập.</p>

      <h3>Mua đồng hồ chạy bộ ở đâu?</h3>
      <p><strong>Imsports</strong> là một nhà phân phối chính hãng đồng hồ chạy bộ, đồng thời là điểm đến lý tưởng để bạn tìm kiếm sản phẩm từ hai thương hiệu hàng đầu là Garmin và Coros. Tại Imsports, bạn sẽ có cơ hội trải nghiệm sự hoàn hảo với việc mua đồng hồ chạy bộ chính hãng.</p>

    `,
  },
};
const ProductCategoryPage = () => {
  const { category } = useParams(); // 👈 Lấy param từ URL
  // console.log('category', category);


  const [filters, setFilters] = useState({
    sizes: [],
    brands: [],
    price: null
  });

  const isFiltering =
    (filters.sizes?.length > 0) ||
    (filters.brands?.length > 0) ||
    (filters.price && filters.price.min !== 0 );

  useEffect(() => {
    if (filters.reset) {
      setFilters({
        sizes: [],
        brands: [],
        price: null,
        isFiltering: false,
      });
      return;
    }

    // các cập nhật filter bình thường tại đây
  }, [filters]);
  // === Gom dữ liệu lại ===
  const dataNew = categoriesType.map((type) => {
    const relatedCategories = categories
      .filter((cat) => cat.categories_type_id === type.id)
      .map((cat) => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        products: products.filter((p) => p.category_id === cat.id)
      }));

    return {
      id: type.id,
      categoriesType: type.name,
      slug: type.slug,
      description: type.description,
      categories: relatedCategories
    };
  });
  const data = []
  let categorieTitle = ''
  let categorieDescription = ''
  let selectedPage = dataNew.find(item => item.slug === category);
  if (selectedPage) {

    categorieTitle = selectedPage.categoriesType
    selectedPage.categories.forEach(item => {
      item.products.forEach(product => {
        data.push(product);
      });
    });

  } else {
    selectedPage = dataNew.find(item => {
      item.categories.forEach(item => {
        if (item.slug === category) {
          categorieTitle = item.name
          item.products.forEach(product => {
            data.push(product);
          });
        }
      });
    });
  }
  // console.log('data', data);
  // console.log('selectedPage', selectedPage);

  const handleFilterChange = (newFilter) => {
    setFilters((prev) => ({ ...prev, ...newFilter }));
  };
  const filteredProducts = data.filter((p) => {
    const matchSize =
      filters.sizes.length === 0 ||
      filters.sizes.some((s) => p.size?.split(",").includes(s));

    const matchBrand =
      filters.brands.length === 0 || filters.brands.includes(p.brand?.trim().toLowerCase());

    // console.log(filters.brands.includes(p.brand));
    const matchPrice =
      !filters.price ||
      (p.price >= filters.price.min && p.price <= filters.price.max);
    return matchSize && matchBrand && matchPrice;
  });
  console.log(isFiltering);

  // console.log("data new"+filteredProducts);

  return (
    <>
      <Breadcrumb data={dataNew} />
      <div className="container flex ">
        <div className="md:flex inline-block w-auto bg-white h-full border-2 border-solid ">
          {/* <FilterByCategories data={dataFilter} /> */}
          <FilterContainer data={dataNew} onFilterChange={handleFilterChange} />
        </div>
        <div className="flex-1">
          <ProductGridPage
            title={data.categoriesType}
            category={category}
            description={selectedPage?.description || ""}
            productData={isFiltering ? filteredProducts : data}
          />
        </div>
      </div>

    </>
  );
};

export default ProductCategoryPage;
